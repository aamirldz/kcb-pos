import { CATEGORIES, MENU_ITEMS, TABLES, CUSTOMERS, STAFF, INVENTORY, MODIFIERS, DISCOUNT_COUPONS, KITCHEN_STATIONS } from './data.js';
import { fmt, spice, timeAgo, getStation, getCartTotals } from './main.js';

/* ═══════════════════════════════════════════════
   SCREEN RENDERERS — World-Class POS Screens
   ═══════════════════════════════════════════════ */

export function renderScreenContent(screen, state) {
  const renderers = {
    dashboard: renderDashboard,
    billing: renderBilling,
    kds: renderKDS,
    tables: renderTables,
    menu: renderMenuMgmt,
    inventory: renderInventory,
    reports: renderReports,
    crm: renderCRM,
    staff: renderStaff,
    settings: renderSettings
  };
  return (renderers[screen] || renderDashboard)(state);
}

/* ═══════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════ */
function renderDashboard(state) {
  const todayOrders = state.orders.filter(o => Date.now() - o.time < 86400000);
  const revenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const avgOrder = todayOrders.length ? Math.round(revenue / todayOrders.length) : 0;
  const dailyGoal = state.settings?.dailyGoal || 40000;
  const goalPct = Math.min(Math.round((revenue / dailyGoal) * 100), 100);
  const goalDash = (goalPct / 100) * 188.5;

  // Yesterday's data from reportHistory for comparison
  const yestStart = new Date(); yestStart.setDate(yestStart.getDate() - 1); yestStart.setHours(0, 0, 0, 0);
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const yestOrders = (state.reportHistory || []).filter(o => o.time >= yestStart.getTime() && o.time < todayStart.getTime());
  const yestRevenue = yestOrders.reduce((s, o) => s + o.total, 0);
  const yestAvg = yestOrders.length ? Math.round(yestRevenue / yestOrders.length) : 0;
  const revGrowth = yestRevenue > 0 ? Math.round((revenue - yestRevenue) / yestRevenue * 100) : 0;
  const ordGrowth = yestOrders.length > 0 ? Math.round((todayOrders.length - yestOrders.length) / yestOrders.length * 100) : 0;
  const avgGrowth = yestAvg > 0 ? Math.round((avgOrder - yestAvg) / yestAvg * 100) : 0;

  // Hourly data
  const hours = Array.from({ length: 16 }, (_, i) => i + 8);
  const hourlyData = hours.map(h => {
    const amt = todayOrders.filter(o => new Date(o.time).getHours() === h).reduce((s, o) => s + o.total, 0);
    return { h, amt };
  });
  const maxHourly = Math.max(...hourlyData.map(d => d.amt), 1);

  // Real sparkline: last 7 hours of revenue
  const curHour = new Date().getHours();
  const sparkHours = Array.from({ length: 7 }, (_, i) => curHour - 6 + i).filter(h => h >= 0);
  const sparkVals = sparkHours.map(h => todayOrders.filter(o => new Date(o.time).getHours() === h).reduce((s, o) => s + o.total, 0));
  const maxSpark = Math.max(...sparkVals, 1);

  return `<div class="animate-in">
    <button class="back-to-settings-btn" data-goto="settings">← Back to Settings</button>
    <!-- Live Ticker -->
    <div class="ticker-bar">
      <span class="live-badge">🔴 LIVE</span>
      <div class="ticker-scroll-area">
        ${todayOrders.length > 0
      ? todayOrders.slice(0, 6).map(o => `<span class="ticker-item"><strong>${o.id}</strong> ${o.type} ${fmt(o.total)} — ${timeAgo(Date.now() - o.time)}</span>`).join('  •  ')
      : '<span class="ticker-item">No orders yet today. Start taking orders!</span>'}
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="stat-grid-4">
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-icon">💰</span>${revGrowth !== 0 ? `<span class="stat-badge ${revGrowth >= 0 ? 'up' : 'down'}">${revGrowth >= 0 ? '↑' : '↓'} ${Math.abs(revGrowth)}%</span>` : ''}</div>
        <div class="stat-value">${fmt(revenue)}</div>
        <div class="stat-label">Today's Revenue</div>
        <div class="stat-sparkline">${sparkVals.map(v => `<div class="spark-bar" data-h="${Math.round(v / maxSpark * 28)}"></div>`).join('')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-icon">📦</span>${ordGrowth !== 0 ? `<span class="stat-badge ${ordGrowth >= 0 ? 'up' : 'down'}">${ordGrowth >= 0 ? '↑' : '↓'} ${Math.abs(ordGrowth)}%</span>` : ''}</div>
        <div class="stat-value">${todayOrders.length}</div>
        <div class="stat-label">Orders Today</div>
        <div class="stat-sub">🍽️ Dine-in: ${todayOrders.filter(o => o.type === 'dine-in').length} · 🥡 Takeaway: ${todayOrders.filter(o => o.type === 'takeaway').length} · 🛵 Delivery: ${todayOrders.filter(o => o.type === 'delivery').length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header"><span class="stat-icon">📊</span>${avgGrowth !== 0 ? `<span class="stat-badge ${avgGrowth >= 0 ? 'up' : 'down'}">${avgGrowth >= 0 ? '↑' : '↓'} ${Math.abs(avgGrowth)}%</span>` : ''}</div>
        <div class="stat-value">${fmt(avgOrder)}</div>
        <div class="stat-label">Avg Order Value</div>
        <div class="stat-sub">${yestAvg > 0 ? 'vs ' + fmt(yestAvg) + ' yesterday' : 'No data from yesterday'}</div>
      </div>
      <div class="stat-card stat-goal">
        <div class="stat-card-header"><span class="stat-icon">🎯</span></div>
        <div class="goal-ring-wrap">
          <svg class="goal-ring" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="none" stroke="var(--bg-tertiary)" stroke-width="5"/><circle cx="35" cy="35" r="30" fill="none" stroke="var(--brand-gold)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${goalDash} 188.5" transform="rotate(-90 35 35)"/></svg>
          <span class="goal-pct">${goalPct}%</span>
        </div>
        <div class="stat-label">Daily Goal: ${fmt(dailyGoal)}</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <button class="quick-action-btn" data-goto="billing"><span class="qa-icon">🧾</span>New Order</button>
      <button class="quick-action-btn" data-goto="kds"><span class="qa-icon">🍳</span>Kitchen</button>
      <button class="quick-action-btn" data-goto="tables"><span class="qa-icon">🪑</span>Tables</button>
      <button class="quick-action-btn" data-goto="reports"><span class="qa-icon">📈</span>Reports</button>
    </div>

    <!-- Charts Row -->
    <div class="dashboard-grid-2">
      <!-- Hourly Revenue -->
      <div class="card">
        <div class="card-header"><span>📊 Hourly Revenue</span><span class="card-badge">Today</span></div>
        <div class="hourly-chart">
          ${hourlyData.map(d => `
            <div class="hchart-col">
              <div class="hchart-amount">${d.amt > 0 ? '₹' + (d.amt / 1000).toFixed(1) + 'k' : ''}</div>
              <div class="chart-bar ${new Date().getHours() === d.h ? 'peak' : ''}" data-height="${Math.max(d.amt / maxHourly * 130, 4)}" style="height:0"></div>
              <div class="hchart-label">${d.h}h</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Live Tables -->
      <div class="card">
        <div class="card-header"><span>🪑 Live Tables</span><span class="card-badge">${TABLES.filter(t => t.status !== 'available').length}/${TABLES.length} Occupied · ${TABLES.filter(t => t.status === 'occupied').reduce((s, t) => s + (t.guests || 0), 0)} Guests</span></div>
        <div class="table-mini-grid">
          ${TABLES.slice(0, 15).map(t => `<div class="table-mini ${t.status}"><span>T${t.id}</span></div>`).join('')}
        </div>
      </div>

      <!-- Top Selling -->
      <div class="card">
        <div class="card-header"><span>🔥 Top Selling</span><span class="card-badge">Today</span></div>
        <div class="top-items-list">
          ${(() => {
      // Count real items sold from today's orders
      const itemCounts = {};
      const itemRevenue = {};
      todayOrders.forEach(o => (o.items || []).forEach(i => {
        itemCounts[i.name] = (itemCounts[i.name] || 0) + (i.qty || 1);
        itemRevenue[i.name] = (itemRevenue[i.name] || 0) + (i.price || 0) * (i.qty || 1);
      }));
      const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const maxQty = topItems.length ? topItems[0][1] : 1;
      if (topItems.length === 0) return '<div style="padding:20px;text-align:center;color:#999;">No orders yet today</div>';
      return topItems.map(([name, qty], i) => `<div class="top-item-row">
              <span class="top-item-rank">#${i + 1}</span>
              <div class="top-item-info">
                <div class="top-item-name">${name}</div>
                <div class="top-item-bar" data-width="${Math.round(qty / maxQty * 100)}" style="width:0"></div>
              </div>
              <div class="top-item-stats">
                <span class="top-item-qty">${qty} sold</span>
                <span class="top-item-rev">${fmt(itemRevenue[name] || 0)}</span>
              </div>
            </div>`).join('');
    })()}
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="card">
        <div class="card-header"><span>🕐 Recent Orders</span><span class="card-badge">${todayOrders.length} total</span></div>
        <div class="recent-orders-list">
          ${todayOrders.length > 0 ? todayOrders.slice(0, 6).map(o => `
            <div class="recent-order-row">
              <span class="order-type-chip ${o.type}">${o.type === 'dine-in' ? '🍽️' : o.type === 'takeaway' ? '🥡' : '🛵'} ${o.type}</span>
              <div class="recent-order-info"><span class="recent-order-id">${o.id}</span></div>
              <div class="recent-order-total ${o.isComplimentary ? 'comp' : ''}">${o.isComplimentary ? 'COMP' : fmt(o.total)}</div>
              <span class="recent-order-payment">${o.payment?.toUpperCase() || 'CASH'}</span>
              <span class="recent-order-time">${timeAgo(Date.now() - o.time)}</span>
            </div>
          `).join('') : '<div style="padding:20px;text-align:center;color:#999;">No orders yet today. Start taking orders!</div>'}
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════
   BILLING
   ═══════════════════════════════════════════════ */
function renderBilling(state) {
  const items = MENU_ITEMS.filter(i => {
    if (state.selectedCategory !== 'all' && i.category !== state.selectedCategory) return false;
    if (state.vegFilter === 'veg' && !i.veg) return false;
    if (state.vegFilter === 'nonveg' && i.veg) return false;
    if (state.searchQuery && !i.name.toLowerCase().includes(state.searchQuery.toLowerCase())) return false;
    return true;
  });

  const t = getCartTotals();

  return `<div class="billing-screen">
    <div class="billing-layout">
      <!-- ═══ LEFT: MENU ═══ -->
      <div class="billing-menu">
        <div class="menu-top-bar">
          <div class="search-box">
            <span class="search-icon-left">🔍</span>
            <input type="text" id="menuSearch" placeholder="Search menu... (F1)" value="${state.searchQuery}" autocomplete="off">
            <kbd class="search-kbd">F1</kbd>
          </div>
          <div class="filter-row">
            <button class="filter-btn ${state.vegFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
            <button class="filter-btn veg ${state.vegFilter === 'veg' ? 'active' : ''}" data-filter="veg">🟢 Veg</button>
            <button class="filter-btn nonveg ${state.vegFilter === 'nonveg' ? 'active' : ''}" data-filter="nonveg">🔴 Non-Veg</button>
          </div>
        </div>
        <div class="cat-tabs">
          <button class="cat-tab ${state.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">🍜 All</button>
          ${CATEGORIES.map(c => `<button class="cat-tab ${state.selectedCategory === c.id ? 'active' : ''}" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join('')}
        </div>
        <div class="menu-grid" id="menuGrid">
          ${items.map(item => `
            <div class="menu-card ${!item.avail ? 'out' : ''}" data-id="${item.id}">
              <span class="mc-veg ${item.veg ? 'veg' : 'nonveg'}"></span>
              <div class="mc-name">${item.name}</div>
              <div class="mc-price">${fmt(item.price)}</div>
              ${item.spice ? `<div class="mc-spice">${spice(item.spice)}</div>` : ''}
              <div class="mc-tags">${item.tags.map(t => `<span class="mc-tag ${t}">${t.replace('-', ' ')}</span>`).join('')}</div>
              ${item.avail ? '' : '<div class="mc-out">OUT OF STOCK</div>'}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ═══ RIGHT: CART ═══ -->
      <div class="billing-cart">
        <div class="cart-header">
          <div class="cart-header-top">
            <span class="cart-title">🧾 Current Order</span>
            <button class="btn btn-ghost btn-sm" id="clearCart">Clear</button>
          </div>
          ${state.selectedTable ? `<div class="cart-table-tag">🪑 Table ${state.selectedTable}</div>` : ''}
          ${state.attachedCustomer ? `<div class="cart-customer-tag">👤 ${state.attachedCustomer.name} <span class="loyalty-badge sm ${state.attachedCustomer.loyalty}">${state.attachedCustomer.loyalty}</span></div>` : ''}
          ${state.orderNote ? `<div class="cart-note-tag">📝 ${state.orderNote}</div>` : ''}
          ${state.isComplimentary ? `<div class="cart-comp-tag">🎁 Complimentary Order</div>` : ''}
          <div class="type-row">
            <button class="type-btn ${state.orderType === 'dine-in' ? 'active' : ''}" data-type="dine-in">🍽️ Dine-In</button>
            <button class="type-btn ${state.orderType === 'takeaway' ? 'active' : ''}" data-type="takeaway">🥡 Takeaway</button>
            <button class="type-btn ${state.orderType === 'delivery' ? 'active' : ''}" data-type="delivery">🛵 Delivery</button>
          </div>
        </div>
        
        <div class="cart-items-area" id="cartItems">
          ${state.cart.length === 0 ? `
            <div class="cart-empty">
              <div class="cart-empty-icon">🛒</div>
              <div class="cart-empty-text">Tap items to add to order</div>
              <div class="cart-empty-sub">F1 = Search • F2 = Pay • F3 = KDS</div>
            </div>
          ` : state.cart.map((item, idx) => {
    const modCost = (item.modifiers || []).reduce((s, m) => s + m.price, 0);
    const lineTotal = (item.price + modCost) * item.qty;
    return `
              <div class="cart-item">
                <div class="cart-item-info">
                  <div class="cart-item-name-row">
                    <span class="cart-item-veg ${item.veg ? 'veg' : 'nonveg'}"></span>
                    <span class="cart-item-name">${item.name}</span>
                  </div>
                  ${item.modifiers?.length ? `<div class="cart-item-mods">${item.modifiers.map(m => `<span class="cart-mod-tag">${m.icon} ${m.name}${m.price ? ' +₹' + m.price : ''}</span>`).join('')}</div>` : ''}
                  ${item.notes ? `<div class="cart-item-note">📝 ${item.notes}</div>` : ''}
                  <div class="cart-item-unit-price">${fmt(item.price)}${modCost ? ' + ₹' + modCost : ''} each</div>
                </div>
                <button class="cart-customize-btn" data-idx="${idx}" title="Customize">✏️</button>
                <div class="cart-item-qty-col">
                  <button class="cart-qty-btn minus" data-action="dec" data-idx="${idx}">−</button>
                  <span class="cart-qty-value">${item.qty}</span>
                  <button class="cart-qty-btn plus" data-action="inc" data-idx="${idx}">+</button>
                </div>
                <div class="cart-item-total">${fmt(lineTotal)}</div>
              </div>`;
  }).join('')}
        </div>

        <!-- Action Bar -->
        <div class="cart-actions-bar">
          <button class="action-chip" id="discountBtn">🏷️ Discount</button>
          <button class="action-chip ${state.isComplimentary ? 'active' : ''}" id="compBtn">🎁 Comp</button>
          <button class="action-chip" id="noteBtn">📝 Note</button>
          <button class="action-chip" id="custBtn">👤 Customer</button>
          <button class="action-chip" id="heldBtn">📋 Held (${state.runningOrders.length})</button>
          <button class="action-chip" id="printLastBillBtn">🖨️ Print Bill</button>
        </div>

        <!-- Summary -->
        <div class="cart-summary" id="cartSummary">
          ${state.cart.length > 0 ? `
            <div class="summary-line"><span>Subtotal (${t.itemCount} items)</span><span>${fmt(t.subtotal)}</span></div>
            ${state.isComplimentary ? `<div class="summary-line discount"><span>🎁 Complimentary</span><span>− 100%</span></div>` : ''}
            ${t.discountAmt > 0 && !state.isComplimentary ? `<div class="summary-line discount"><span>🏷️ ${state.discount.name || 'Discount'}</span><span>− ${fmt(t.discountAmt)}</span></div>` : ''}
            <div class="summary-line"><span>GST @ ${state.settings.gstRate}%</span><span>${fmt(t.gst)}</span></div>
            ${t.svcCharge > 0 ? `<div class="summary-line"><span>Service Charge @ ${state.settings.serviceCharge}%</span><span>${fmt(t.svcCharge)}</span></div>` : ''}
            <div class="summary-line grand-total"><span>Grand Total</span><span>${fmt(t.total)}</span></div>
          ` : ''}
        </div>

        <!-- Payment Method Row — Petpooja style -->
        <div class="billing-pay-row">
          <button class="split-chip" id="splitBtn">Split</button>
          <span class="billing-total-label">Total <strong>${state.cart.length > 0 ? t.total : 0}</strong></span>
        </div>
        <div class="billing-pay-methods">
          <label class="pay-method-chip ${(state.billingPayMethod || 'cash') === 'cash' ? 'active' : ''}"><input type="radio" name="billingPay" value="cash" ${(state.billingPayMethod || 'cash') === 'cash' ? 'checked' : ''}> Cash</label>
          <label class="pay-method-chip ${state.billingPayMethod === 'card' ? 'active' : ''}"><input type="radio" name="billingPay" value="card" ${state.billingPayMethod === 'card' ? 'checked' : ''}> Card</label>
          <label class="pay-method-chip ${state.billingPayMethod === 'due' ? 'active' : ''}"><input type="radio" name="billingPay" value="due" ${state.billingPayMethod === 'due' ? 'checked' : ''}> Due</label>
          <label class="pay-method-chip ${state.billingPayMethod === 'other' ? 'active' : ''}"><input type="radio" name="billingPay" value="other" ${state.billingPayMethod === 'other' ? 'checked' : ''}> Other</label>
          <label class="pay-method-chip ${state.billingPayMethod === 'upi' ? 'active' : ''}"><input type="radio" name="billingPay" value="upi" ${state.billingPayMethod === 'upi' ? 'checked' : ''}> UPI</label>
        </div>
        <div class="billing-paid-check">
          <label class="its-paid-label"><input type="checkbox" id="itsPaidCheck" ${state.itsPaid ? 'checked' : ''}> It's Paid</label>
        </div>

        <!-- Bottom Buttons — Petpooja-style -->
        <div class="cart-bottom">
          <button class="btn btn-lg billing-action-btn save-btn" id="saveBtn">Save</button>
          <button class="btn btn-lg billing-action-btn save-print-btn" id="savePrintBtn">Save & Print</button>
          <button class="btn btn-lg billing-action-btn kot-btn" id="kotBtn">KOT</button>
          <button class="btn btn-lg billing-action-btn kot-print-btn" id="kotPrintBtn">KOT & Print</button>
          <button class="btn btn-lg billing-action-btn hold-btn" id="holdBtn">Hold</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════
   KDS
   ═══════════════════════════════════════════════ */
function renderKDS(state) {
  const orders = state.kdsOrders.filter(o => o.status !== 'done');
  const filtered = state.kdsStation === 'all' ? orders : orders.filter(o => o.items.some(i => i.station === state.kdsStation));
  const activeCount = orders.filter(o => o.status === 'new').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const avgTime = orders.length ? Math.round(orders.reduce((s, o) => s + (Date.now() - o.startTime), 0) / orders.length / 60000) : 0;

  return `<div class="animate-in">
    <div class="kds-header">
      <div class="kds-stats">
        <span class="kds-stat">🍳 <strong>${activeCount}</strong> Active</span>
        <span class="kds-stat ready">✅ <strong>${readyCount}</strong> Ready</span>
        <span class="kds-stat">📊 Avg Cook: <strong>${avgTime}m</strong></span>

      </div>
      <div class="kds-station-tabs">
        <button class="kds-station-btn ${state.kdsStation === 'all' ? 'active' : ''}" data-station="all">🔵 All</button>
        ${KITCHEN_STATIONS.map(s => `<button class="kds-station-btn ${state.kdsStation === s.id ? 'active' : ''}" data-station="${s.id}">${s.icon} ${s.name}</button>`).join('')}
      </div>
    </div>

    <div class="kds-grid">
      ${filtered.length === 0 ? '<div class="kds-empty">✨ All clear — no pending orders</div>' : ''}
      ${filtered.map((order, oi) => {
    const elapsed = Math.round((Date.now() - order.startTime) / 60000);
    const readyItems = order.items.filter(i => i.ready).length;
    const progress = order.items.length ? Math.round(readyItems / order.items.length * 100) : 0;
    const urgency = elapsed >= 15 ? 'urgent' : elapsed >= 10 ? 'warning' : '';

    return `<div class="kds-card ${order.status} ${urgency}">
          <div class="kds-card-head">
            <div>
              <span class="kds-id">${order.id}</span>
              <span class="kds-type-badge ${order.type}">${order.type === 'dine-in' ? 'DINE IN' : order.type.toUpperCase()}</span>
              ${order.table ? `<span class="kds-table-badge">T${order.table}</span>` : ''}
            </div>
            <span class="kds-timer ${urgency}">${elapsed}:${String(Math.round((Date.now() - order.startTime) / 1000) % 60).padStart(2, '0')}</span>
          </div>
          <div class="kds-progress"><div class="kds-progress-fill" style="width:${progress}%"></div></div>
          <div class="kds-items-list">
            ${order.items.map((item, ii) => `
              <div class="kds-item ${item.ready ? 'done' : ''}">
                <button class="kds-item-check" data-oi="${state.kdsOrders.indexOf(order)}" data-ii="${ii}">${item.ready ? '✅' : '⬜'}</button>
                <span class="kds-item-name">${item.name}</span>
                <span class="kds-item-qty">×${item.qty}</span>
                <span class="kds-item-station-icon">${getStation(item.category || '')?.icon || '🍳'}</span>
              </div>
              ${item.modifiers?.length ? `<div class="kds-mods">${item.modifiers.map(m => `<span class="kds-mod">${m}</span>`).join('')}</div>` : ''}
              ${item.notes ? `<div class="kds-note">📝 ${item.notes}</div>` : ''}
            `).join('')}
          </div>
          <div class="kds-card-actions">
            ${order.status === 'ready' ? `
              <button class="btn btn-sm btn-ghost kds-recall" data-idx="${state.kdsOrders.indexOf(order)}">↩ Recall</button>
              <button class="btn btn-sm btn-success kds-bump" data-idx="${state.kdsOrders.indexOf(order)}">✅ Bump / Serve</button>
            ` : `
              <button class="btn btn-sm btn-ghost kds-recall" data-idx="${state.kdsOrders.indexOf(order)}">↩ Recall</button>
              <button class="btn btn-sm btn-primary kds-ready" data-idx="${state.kdsOrders.indexOf(order)}">✅ Mark Ready</button>
            `}
          </div>
        </div>`;
  }).join('')}
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════
   TABLES
   ═══════════════════════════════════════════════ */
function renderTables(state) {
  const occ = TABLES.filter(t => t.status !== 'available').length;

  return `<div class="animate-in">
    <div class="page-header">
      <h2>🪑 Table Management — Main Hall</h2>
      <button class="btn btn-primary" id="editTablesBtn">✏️ Edit Tables</button>
    </div>
    <div class="tables-layout">
      <div class="tables-main">
        <div class="tables-header">
          <div class="table-legend">
            <span><span class="legend-dot available"></span> Blank</span>
            <span><span class="legend-dot occupied"></span> Running</span>
            <span><span class="legend-dot printed"></span> Printed</span>
            <span><span class="legend-dot paid"></span> Paid</span>
          </div>
        </div>
        <div class="table-grid">
          ${TABLES.map(t => `
            <div class="table-cell ${t.status}" data-table="${t.id}">
              ${(t.status !== 'available') && t.amount ? `<span class="table-amount">${fmt(t.amount)}</span>` : ''}
              <span class="table-number">T${t.id}</span>
              <span class="table-status-label">${t.status === 'available' ? 'Available' : t.status === 'occupied' ? `${t.guests || '-'} guests` : t.status === 'printed' ? 'PRINTED' : t.status === 'paid' ? 'PAID ✓' : t.status === 'bill-pending' ? 'BILL' : t.status.toUpperCase()}</span>
              ${(t.status === 'occupied' || t.status === 'paid' || t.status === 'bill-pending') && t.occupiedSince ? `<span class="table-timer">${Math.floor((Date.now() - t.occupiedSince) / 60000)}m</span>` : ''}
              ${t.status === 'occupied' || t.status === 'bill-pending' ? `<div class="table-action-icons">
                <button class="table-icon-btn table-view-btn" data-table-id="${t.id}" title="View Order">👁️</button>
                <button class="table-icon-btn table-print-btn" data-table-id="${t.id}" title="Print Bill">🖨️</button>
              </div>` : ''}
              ${t.status === 'printed' || t.status === 'paid' ? `<div class="table-action-icons" style="gap:6px">
                <button class="table-icon-btn table-view-btn" data-table-id="${t.id}" title="View Order">👁️</button>
                <button class="table-icon-btn table-settle-btn" data-table-id="${t.id}" title="Settle & Save" style="width:auto;padding:0 10px;font-size:.7rem;font-weight:700">💰 Settle</button>
              </div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="tables-sidebar-panel">
        <div class="card" style="margin-top:14px">
          <div class="card-header">📊 Occupancy</div>
          <div class="table-summary-stats">
            <div><span class="table-stat-num">${occ}</span><span class="table-stat-label">Occupied</span></div>
            <div><span class="table-stat-num">${TABLES.length - occ}</span><span class="table-stat-label">Available</span></div>
            <div><span class="table-stat-num">${TABLES.filter(t => t.status === 'bill-pending').length}</span><span class="table-stat-label">Bill Pending</span></div>
            <div><span class="table-stat-num">${TABLES.filter(t => t.status === 'paid').length}</span><span class="table-stat-label">Paid</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════
   MENU MANAGEMENT
   ═══════════════════════════════════════════════ */
function renderMenuMgmt() {
  return `<div class="animate-in">
    <div class="page-header">
      <button class="back-to-settings-btn" data-goto="settings">← Back to Settings</button>
      <h2>📋 Menu Management</h2>
      <div class="page-header-actions">
        <input type="text" id="menuMgmtSearch" class="search-input" placeholder="🔍 Search items...">
        <button class="btn btn-primary" id="addMenuItemBtn">+ Add Item</button>
      </div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Type</th><th>Spice</th><th>Tags</th><th>Available</th><th></th></tr></thead>
        <tbody>
          ${MENU_ITEMS.map((item, idx) => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td>${CATEGORIES.find(c => c.id === item.category)?.name || item.category}</td>
              <td class="price-cell">${fmt(item.price)}</td>
              <td><span class="veg-badge ${item.veg ? 'veg' : 'nonveg'}">${item.veg ? 'VEG' : 'NON-VEG'}</span></td>
              <td>${spice(item.spice)}</td>
              <td>${item.tags.map(t => `<span class="mc-tag ${t}">${t}</span>`).join(' ')}</td>
              <td><div class="avail-toggle ${item.avail ? 'on' : 'off'}" data-id="${item.id}"><span class="toggle-knob"></span></div></td>
              <td>
                <button class="btn btn-sm btn-secondary edit-menu-btn" data-idx="${idx}">✏️ Manage</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div > `;
}

/* ═══════════════════════════════════════════════
   INVENTORY
   ═══════════════════════════════════════════════ */
function renderInventory() {
  const total = INVENTORY.length;
  const low = INVENTORY.filter(i => i.stock <= i.reorder * 1.5).length;
  const critical = INVENTORY.filter(i => i.stock <= i.reorder * 0.5).length;

  return `<div class="animate-in">
    <button class="back-to-settings-btn" data-goto="settings">← Back to Settings</button>
    <div class="page-header"><h2>📦 Inventory</h2><button class="btn btn-primary" id="addInventoryBtn">+ Add Item</button></div>
    <div class="stat-grid-4" style="margin-bottom:16px">
      <div class="stat-card"><div class="stat-value">${total}</div><div class="stat-label">Total Items</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--warning)">${low}</div><div class="stat-label">Low Stock</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--danger)">${critical}</div><div class="stat-label">Critical</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--success)">${total - low}</div><div class="stat-label">Adequate</div></div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead><tr><th>Item</th><th>Category</th><th>Stock</th><th>Unit</th><th>Reorder Level</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${INVENTORY.map((item, idx) => {
    const ratio = item.stock / item.reorder;
    const status = ratio <= 0.5 ? 'critical' : ratio <= 1.5 ? 'low' : 'ok';
    return `<tr>
              <td><strong>${item.name}</strong></td>
              <td>${item.category}</td>
              <td>${item.stock}</td>
              <td>${item.unit}</td>
              <td>${item.reorder}</td>
              <td><span class="status-badge ${status}">${status.toUpperCase()}</span></td>
              <td>
                <button class="btn btn-sm btn-secondary edit-inv-btn" data-idx="${idx}">✏️ Manage</button>
              </td>
            </tr>`;
  }).join('')}
        </tbody>
      </table>
    </div>
  </div > `;
}

/* ═══════════════════════════════════════════════
   REPORTS
   ═══════════════════════════════════════════════ */
function renderReports(state) {
  const period = state.reportPeriod || 'today';
  const now = Date.now();
  const DAY = 86400000;

  // Use real orders + archived report history
  let orders = [...(state.orders || [])];
  // Add archived orders from past days for week/month views
  if (state.reportHistory && Array.isArray(state.reportHistory)) {
    orders = [...orders, ...state.reportHistory];
  }
  // Sort by time descending
  orders.sort((a, b) => b.time - a.time);

  // Filter by period
  const periodStart = period === 'today' ? now - DAY
    : period === 'week' ? now - 7 * DAY
      : now - 30 * DAY;
  const filtered = orders.filter(o => o.time >= periodStart);

  // Compute stats
  const totalRevenue = filtered.reduce((s, o) => s + (o.total || 0), 0);
  const totalOrders = filtered.length;
  const avgValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
  const totalDiscount = filtered.reduce((s, o) => s + (o.discount || 0), 0);
  const totalGST = filtered.reduce((s, o) => s + (o.gst || 0), 0);

  // Previous period comparison
  const prevStart = period === 'today' ? periodStart - DAY
    : period === 'week' ? periodStart - 7 * DAY
      : periodStart - 30 * DAY;
  const prevFiltered = orders.filter(o => o.time >= prevStart && o.time < periodStart);
  const prevRevenue = prevFiltered.reduce((s, o) => s + (o.total || 0), 0);
  const growth = prevRevenue > 0 ? Math.round((totalRevenue - prevRevenue) / prevRevenue * 100) : 0;

  // Payment breakdown
  const payments = {};
  filtered.forEach(o => { const m = o.payment || 'cash'; payments[m] = (payments[m] || 0) + (o.total || 0); });
  const payMethods = Object.entries(payments).sort((a, b) => b[1] - a[1]);
  const payColors = { cash: '#2ecc71', upi: '#3498db', card: '#f5a623', 'net-banking': '#9b59b6', wallet: '#e67e22' };

  // Order type breakdown
  const types = {};
  filtered.forEach(o => { const t = o.type || 'dine-in'; types[t] = (types[t] || 0) + 1; });
  const typeColors = { 'dine-in': '#3498db', takeaway: '#f5a623', delivery: '#2ecc71' };
  const typeIcons = { 'dine-in': '🍽️', takeaway: '📦', delivery: '🚗' };

  // Top items + pre-compute revenue map to avoid O(n²)
  const itemCounts = {};
  const itemRevenueMap = {};
  filtered.forEach(o => (o.items || []).forEach(i => {
    itemCounts[i.name] = (itemCounts[i.name] || 0) + (i.qty || 1);
    itemRevenueMap[i.name] = (itemRevenueMap[i.name] || 0) + (i.price || 0) * (i.qty || 1);
  }));
  const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxItemQty = topItems.length ? topItems[0][1] : 1;

  // Revenue trend
  let trendLabels = [], trendValues = [];
  if (period === 'today') {
    for (let h = 8; h <= 23; h++) {
      const hStart = new Date(); hStart.setHours(h, 0, 0, 0);
      const hEnd = new Date(); hEnd.setHours(h + 1, 0, 0, 0);
      trendLabels.push(`${h} h`);
      trendValues.push(filtered.filter(o => o.time >= hStart.getTime() && o.time < hEnd.getTime()).reduce((s, o) => s + (o.total || 0), 0));
    }
  } else if (period === 'week') {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let d = 6; d >= 0; d--) {
      const dStart = now - d * DAY;
      const dEnd = dStart + DAY;
      const dt = new Date(dStart);
      trendLabels.push(dayNames[dt.getDay()]);
      trendValues.push(filtered.filter(o => o.time >= dStart && o.time < dEnd).reduce((s, o) => s + (o.total || 0), 0));
    }
  } else {
    for (let d = 29; d >= 0; d--) {
      const dStart = now - d * DAY;
      const dEnd = dStart + DAY;
      const dt = new Date(dStart);
      trendLabels.push(dt.getDate().toString());
      trendValues.push(filtered.filter(o => o.time >= dStart && o.time < dEnd).reduce((s, o) => s + (o.total || 0), 0));
    }
  }
  const maxTrend = Math.max(...trendValues, 1);

  // Peak hours
  const hourCounts = new Array(16).fill(0); // 8am to 11pm
  filtered.forEach(o => {
    const h = new Date(o.time).getHours();
    if (h >= 8 && h <= 23) hourCounts[h - 8] += 1;
  });
  const maxHourCount = Math.max(...hourCounts, 1);

  // Recent orders
  const recent = filtered.slice(0, 10);

  const periodLabel = period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month';

  // Category breakdown
  const catRevenue = {};
  filtered.forEach(o => (o.items || []).forEach(i => {
    const cat = i.category || 'other';
    catRevenue[cat] = (catRevenue[cat] || 0) + (i.price || 0) * (i.qty || 1);
  }));
  const catEntries = Object.entries(catRevenue).sort((a, b) => b[1] - a[1]);
  const maxCatRev = catEntries.length ? catEntries[0][1] : 1;
  const catColors = ['#e63946', '#f5a623', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#e74c3c'];

  // Month options for download
  const monthOptions = [];
  for (let m = 0; m < 6; m++) {
    const d = new Date();
    d.setMonth(d.getMonth() - m);
    monthOptions.push({ value: `${d.getFullYear()} -${d.getMonth()} `, label: d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) });
  }
  const totalSubtotal = filtered.reduce((s, o) => s + (o.subtotal || 0), 0);
  const netAfterGST = totalRevenue - totalGST;

  // Date range label
  const dateRangeLabel = period === 'today'
    ? new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : period === 'week'
      ? `${new Date(now - 6 * DAY).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} `
      : `${new Date(now - 29 * DAY).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} `;

  const downloadLabel = period === 'today' ? 'Today\'s Report' : period === 'week' ? 'Weekly Report' : 'Monthly Report';

  return `<div class="animate-in">
    <button class="back-to-settings-btn" data-goto="settings">← Back to Settings</button>
    <!-- ═══ HEADER ═══ -->
    <div class="report-header-bar">
      <div class="report-header-left">
        <h2 class="report-title">📈 Reports & Analytics</h2>
        <span class="report-date-range">${dateRangeLabel}</span>
      </div>
      <div class="report-header-right">
        <div class="report-tabs">
          <button class="report-tab ${period === 'today' ? 'active' : ''}" data-period="today">Today</button>
          <button class="report-tab ${period === 'week' ? 'active' : ''}" data-period="week">This Week</button>
          <button class="report-tab ${period === 'month' ? 'active' : ''}" data-period="month">This Month</button>
        </div>
        <div class="report-download-group">
          ${period === 'month' ? `<select id="reportMonthSelect" class="report-month-select">
            ${monthOptions.map(m => `<option value="${m.value}">${m.label}</option>`).join('')}
          </select>` : ''}
          <button class="btn btn-primary btn-download" id="downloadReportBtn">⬇ ${downloadLabel}</button>
        </div>
      </div>
    </div>

    <!-- ═══ KPI CARDS ═══ -->
    <div class="report-section-label">Key Performance Indicators</div>
    <div class="report-kpi-grid">
      <div class="kpi-card kpi-revenue">
        <div class="kpi-icon">💰</div>
        <div class="kpi-body">
          <div class="kpi-value">${fmt(totalRevenue)}</div>
          <div class="kpi-label">Net Revenue</div>
        </div>
        <div class="kpi-badge ${growth > 0 ? 'up' : growth < 0 ? 'down' : 'neutral'}">${growth > 0 ? '▲' : growth < 0 ? '▼' : '—'} ${Math.abs(growth)}%</div>
      </div>
      <div class="kpi-card kpi-orders">
        <div class="kpi-icon">📦</div>
        <div class="kpi-body">
          <div class="kpi-value">${totalOrders}</div>
          <div class="kpi-label">Total Orders</div>
        </div>
      </div>
      <div class="kpi-card kpi-avg">
        <div class="kpi-icon">📊</div>
        <div class="kpi-body">
          <div class="kpi-value">${fmt(avgValue)}</div>
          <div class="kpi-label">Avg Order Value</div>
        </div>
      </div>
      <div class="kpi-card kpi-gst">
        <div class="kpi-icon">🏛️</div>
        <div class="kpi-body">
          <div class="kpi-value">${fmt(totalGST)}</div>
          <div class="kpi-label">GST @ ${state.settings?.gstRate || 5}%</div>
        </div>
      </div>
      <div class="kpi-card kpi-discount">
        <div class="kpi-icon">🏷️</div>
        <div class="kpi-body">
          <div class="kpi-value">${fmt(totalDiscount)}</div>
          <div class="kpi-label">Discounts Given</div>
        </div>
      </div>
    </div>

    <!-- ═══ REVENUE TREND ═══ -->
    <div class="report-section-label">Revenue Trend</div>
    <div class="card report-card" style="margin-bottom:20px">
      <div class="card-header"><span>📊 ${periodLabel} Revenue</span><span class="card-header-sub">${fmt(totalRevenue)} total</span></div>
      <div class="report-chart ${period === 'month' ? 'chart-compact' : ''}">
        ${trendValues.map((v, i) => `
          <div class="hchart-col">
            <div class="hchart-amount">${v > 0 ? '₹' + (v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v) : ''}</div>
            <div class="chart-bar" data-height="${Math.max(v / maxTrend * 120, 4)}" style="height:0"></div>
            <div class="hchart-label">${trendLabels[i]}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ═══ TOP ITEMS + PAYMENTS ═══ -->
    <div class="report-section-label">Sales Performance</div>
    <div class="dashboard-grid-2" style="margin-bottom:20px">
      <div class="card report-card">
        <div class="card-header"><span>🏆 Top Selling Items</span><span class="card-header-sub">${topItems.reduce((s, t) => s + t[1], 0)} sold</span></div>
        <div class="top-items-list">
          ${topItems.length === 0 ? '<div class="empty-state">No data yet</div>' : topItems.map((item, i) => {
    const itemRevenue = itemRevenueMap[item[0]] || 0;
    return `<div class="top-item-row ${i % 2 === 0 ? 'alt' : ''}">
              <span class="top-item-rank">${i + 1}</span>
              <div class="top-item-info-col">
                <span class="top-item-name">${item[0]}</span>
                <span class="top-item-rev-label">${fmt(itemRevenue)}</span>
              </div>
              <div class="top-item-bar-wrap"><div class="top-item-bar" data-width="${Math.round(item[1] / maxItemQty * 100)}" style="width:0"></div></div>
              <span class="top-item-count">${item[1]}</span>
            </div>`;
  }).join('')}
        </div>
      </div>
      <div class="card report-card">
        <div class="card-header"><span>💳 Payment Methods</span><span class="card-header-sub">${fmt(totalRevenue)} total</span></div>
        <div class="payment-breakdown">
          ${payMethods.length === 0 ? '<div class="empty-state">No data yet</div>' : payMethods.map(([method, amount]) => {
    const pct = totalRevenue ? Math.round(amount / totalRevenue * 100) : 0;
    const icons = { cash: '💵', upi: '📱', card: '💳', 'net-banking': '🏦', wallet: '👛' };
    return `<div class="payment-bar-row">
              <span class="payment-icon-label">${icons[method] || '💰'} ${method.charAt(0).toUpperCase() + method.slice(1)}</span>
              <div class="payment-bar-track"><div class="payment-bar-fill" style="width:${pct}%;background:${payColors[method] || '#8b95a8'}"></div></div>
              <span class="payment-pct">${pct}%</span>
              <span class="payment-amt">${fmt(amount)}</span>
            </div>`;
  }).join('')}
        </div>
      </div>
    </div>

    <!-- ═══ CATEGORY + ORDER TYPES ═══ -->
    <div class="report-section-label">Category & Order Analysis</div>
    <div class="dashboard-grid-2" style="margin-bottom:20px">
      <div class="card report-card">
        <div class="card-header"><span>📂 Category Revenue</span><span class="card-header-sub">${catEntries.length} categories</span></div>
        <div class="top-items-list">
          ${catEntries.length === 0 ? '<div class="empty-state">No data yet</div>' : catEntries.map((c, i) => {
    const catName = CATEGORIES.find(cat => cat.id === c[0])?.name || c[0];
    const catIcon = CATEGORIES.find(cat => cat.id === c[0])?.icon || '📦';
    const pct = Math.round(c[1] / maxCatRev * 100);
    const catPctOfTotal = totalRevenue ? Math.round(c[1] / totalRevenue * 100) : 0;
    return `<div class="top-item-row ${i % 2 === 0 ? 'alt' : ''}">
              <span class="top-item-rank" style="background:${catColors[i % catColors.length]};color:#fff;border-color:${catColors[i % catColors.length]}">${catIcon}</span>
              <div class="top-item-info-col">
                <span class="top-item-name">${catName}</span>
                <span class="top-item-rev-label">${catPctOfTotal}% of revenue</span>
              </div>
              <div class="top-item-bar-wrap"><div class="top-item-bar" data-width="${pct}" style="width:0;background:${catColors[i % catColors.length]}"></div></div>
              <span class="top-item-count">${fmt(c[1])}</span>
            </div>`;
  }).join('')}
        </div>
      </div>
      <div class="card report-card">
        <div class="card-header"><span>🍽️ Order Types</span><span class="card-header-sub">${totalOrders} orders</span></div>
        <div class="order-type-breakdown">
          ${Object.entries(types).length === 0 ? '<div class="empty-state">No data yet</div>' : Object.entries(types).map(([type, count]) => {
    const pct = totalOrders ? Math.round(count / totalOrders * 100) : 0;
    const avgTypeRev = count > 0 ? Math.round(filtered.filter(o => o.type === type).reduce((s, o) => s + (o.total || 0), 0) / count) : 0;
    return `<div class="order-type-card">
              <div class="order-type-icon">${typeIcons[type] || '📋'}</div>
              <div class="order-type-info">
                <div class="order-type-name">${type === 'dine-in' ? 'Dine-In' : type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="order-type-stats">${count} orders · ${pct}% · Avg ${fmt(avgTypeRev)}</div>
              </div>
              <div class="order-type-pct">${pct}%</div>
            </div>`;
  }).join('')}
        </div>
      </div>
    </div>

    <!-- ═══ PEAK HOURS + FINANCIAL ═══ -->
    <div class="report-section-label">Operational Insights</div>
    <div class="dashboard-grid-2" style="margin-bottom:20px">
      <div class="card report-card">
        <div class="card-header"><span>🕐 Peak Hours Analysis</span><span class="card-header-sub">Order distribution</span></div>
        <div class="peak-hours-grid">
          ${hourCounts.map((c, i) => {
    const h = i + 8;
    const intensity = c / maxHourCount;
    const bg = intensity > 0.7 ? 'var(--brand)' : intensity > 0.4 ? 'var(--gold)' : intensity > 0 ? 'rgba(0,0,0,.08)' : 'rgba(0,0,0,.03)';
    const textColor = intensity > 0.4 ? '#fff' : 'var(--text-m)';
    return `<div class="peak-hour-cell" style="background:${bg};color:${textColor}" title="${c} orders at ${h}:00">
              <div class="peak-h">${h > 12 ? h - 12 : h}${h >= 12 ? 'p' : 'a'}</div>
              <div class="peak-count">${c}</div>
            </div>`;
  }).join('')}
        </div>
      </div>
      <div class="card report-card">
        <div class="card-header"><span>💰 Financial Summary</span><span class="card-header-sub">${periodLabel}</span></div>
        <div class="financial-grid">
          <div class="financial-row"><span>Gross Revenue (Subtotal)</span><span class="financial-val">${fmt(totalSubtotal)}</span></div>
          <div class="financial-row discount"><span>Discounts Given</span><span class="financial-val">- ${fmt(totalDiscount)}</span></div>
          <div class="financial-row highlight"><span>Net Revenue</span><span class="financial-val bold">${fmt(totalRevenue)}</span></div>
          <div class="financial-row gst"><span>GST @ ${state.settings?.gstRate || 5}%</span><span class="financial-val">${fmt(totalGST)}</span></div>
          <div class="financial-row total"><span>Revenue After GST</span><span class="financial-val bold">${fmt(netAfterGST)}</span></div>
        </div>
      </div>
    </div>

    <!-- ═══ RECENT ORDERS ═══ -->
    <div class="report-section-label">Recent Transactions</div>
    <div class="card report-card">
      <div class="card-header"><span>📋 ${periodLabel} Orders</span><span class="card-header-sub">${filtered.length} total · showing ${Math.min(recent.length, 15)}</span></div>
      <table class="data-table report-table">
        <thead><tr><th>#</th><th>Order ID</th><th>Date & Time</th><th>Type</th><th>Items</th><th>Payment</th><th>Discount</th><th>GST</th><th>Total</th></tr></thead>
        <tbody>
          ${recent.length === 0 ? '<tr><td colspan="9" class="empty-state">No orders yet</td></tr>' : recent.slice(0, 15).map((o, idx) => {
    const t = new Date(o.time);
    const timeStr = t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = t.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    return `<tr class="${idx % 2 === 0 ? 'alt-row' : ''}">
              <td class="row-num">${idx + 1}</td>
              <td><strong>${o.id}</strong></td>
              <td>${dateStr} ${timeStr}</td>
              <td><span class="kds-type-badge ${o.type}">${o.type === 'dine-in' ? 'DINE IN' : (o.type || '').toUpperCase()}</span></td>
              <td>${(o.items || []).length} items</td>
              <td>${(o.payment || 'cash').charAt(0).toUpperCase() + (o.payment || 'cash').slice(1)}</td>
              <td>${o.discount ? '- ' + fmt(o.discount) : '—'}</td>
              <td>${fmt(o.gst || 0)}</td>
              <td class="price-cell"><strong>${fmt(o.total)}</strong></td>
            </tr>`;
  }).join('')}
        </tbody>
      </table>
    </div>
  </div > `;
}
/* ═══════════════════════════════════════════════
   CRM
   ═══════════════════════════════════════════════ */
function renderCRM() {
  return `<div class="animate-in">
    <div class="page-header">
      <button class="back-to-settings-btn" data-goto="settings">← Back to Settings</button>
      <h2>👥 Customers</h2>
      <div class="page-header-actions">
        <input type="text" id="crmSearch" class="search-input" placeholder="🔍 Search customers...">
        <button class="btn btn-primary" id="addCustomerBtn">+ Add Customer</button>
      </div>
    </div>
    <div class="stat-grid-4" style="margin-bottom:16px">
      <div class="stat-card"><div class="stat-value">${CUSTOMERS.length}</div><div class="stat-label">Total Customers</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--brand-gold)">${CUSTOMERS.filter(c => c.loyalty === 'gold').length}</div><div class="stat-label">Gold Members</div></div>
      <div class="stat-card"><div class="stat-value">${fmt(CUSTOMERS.reduce((s, c) => s + c.spent, 0))}</div><div class="stat-label">Total Revenue</div></div>
      <div class="stat-card"><div class="stat-value">${Math.round(CUSTOMERS.reduce((s, c) => s + c.orders, 0) / CUSTOMERS.length)}</div><div class="stat-label">Avg Orders/Customer</div></div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead><tr><th>Customer</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Last Visit</th><th>Loyalty</th><th></th></tr></thead>
        <tbody>
          ${CUSTOMERS.map((c, idx) => `
            <tr>
              <td><strong>${c.name}</strong></td>
              <td>${c.phone}</td>
              <td>${c.orders}</td>
              <td class="price-cell">${fmt(c.spent)}</td>
              <td>${c.lastVisit}</td>
              <td><span class="loyalty-badge ${c.loyalty}">${c.loyalty}</span></td>
              <td>
                <button class="btn btn-sm btn-secondary edit-cust-btn" data-idx="${idx}">✏️ Manage</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div > `;
}

/* ═══════════════════════════════════════════════
   STAFF
   ═══════════════════════════════════════════════ */
function renderStaff() {
  const colors = ['#e63946', '#f5a623', '#3498db', '#2ecc71', '#9b59b6', '#e67e22'];
  return `<div class="animate-in">
    <button class="back-to-settings-btn" data-goto="settings">← Back to Settings</button>
    <div class="page-header"><h2>👨‍🍳 Staff Management</h2><button class="btn btn-primary" id="addStaffBtn">+ Add Staff</button></div>
    <div class="staff-grid">
      ${STAFF.map((s, i) => `
        <div class="staff-card">
          <div class="staff-avatar" style="background:${colors[i % colors.length]}">${s.name.split(' ').map(n => n[0]).join('')}</div>
          <div class="staff-name">${s.name}</div>
          <div class="staff-role">${s.role}</div>
          <div class="staff-meta">
            <span class="staff-status ${s.status}">${s.status === 'active' ? '🟢 Active' : '🔴 Off'}</span>
            <span>📅 ${s.shift}</span>
          </div>
          <div style="margin:6px 0;font-size:11px;">
            ${s.username && s.password ? '<span style="color:#27ae60;font-weight:600;">🔑 Login Active</span> <span style="color:#888;">(' + s.username + ')</span>' : '<span style="color:#aaa;">🔒 No Login Set</span>'}
          </div>
          <div class="staff-perf">
            <div class="perf-label">Performance</div>
            <div class="progress-bar"><div class="progress-fill" data-width="${s.perf || 80}" style="width:0"></div></div>
            <div class="perf-value">${s.perf || 80}%</div>
          </div>
          <div class="staff-actions">
            <button class="btn btn-sm btn-secondary edit-staff-btn" data-idx="${i}">✏️ Manage</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div > `;
}

/* ═══════════════════════════════════════════════
   SETTINGS
   ═══════════════════════════════════════════════ */
function renderSettings(state) {
  const s = state?.settings || {};
  const sel = (cur, val) => cur === val ? 'selected' : '';

  // If settings is PIN-locked and not yet unlocked this session, show PIN screen
  if (!state._settingsUnlocked) {
    return `<div class="animate-in" style="display:flex;align-items:center;justify-content:center;min-height:70vh;">
      <div class="card" style="padding:32px 40px;text-align:center;max-width:340px;width:100%;">
        <div style="font-size:48px;margin-bottom:12px;">🔒</div>
        <h3 style="margin-bottom:4px;">Settings Locked</h3>
        <p style="color:#888;font-size:13px;margin-bottom:20px;">Enter 6-digit PIN to access</p>
        <div id="pinDisplay" style="font-size:28px;letter-spacing:12px;font-weight:bold;margin-bottom:20px;min-height:36px;">______</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:240px;margin:0 auto;">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(n => n === '' ? '<div></div>' :
      '<button class="btn pin-key" data-key="' + n + '" style="padding:14px;font-size:20px;font-weight:700;border-radius:12px;background:var(--card);border:1px solid var(--border);cursor:pointer;">' + n + '</button>'
    ).join('')}
        </div>
        <div id="pinError" style="color:#e63946;margin-top:12px;font-size:13px;min-height:20px;"></div>
      </div>
    </div>`;
  }

  return `<div class="animate-in">
    <div class="page-header"><h2>⚙️ Settings</h2></div>

    <div style="margin-bottom:24px;">
      <h3 style="margin-bottom:12px;font-size:16px;font-weight:700;color:var(--text);">📂 Management</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;">
        <div class="card settings-mgmt-btn" data-goto="dashboard" style="cursor:pointer;padding:18px;text-align:center;transition:transform .15s;"><div style="font-size:28px;margin-bottom:6px;">📊</div><div style="font-weight:600;">Dashboard</div></div>
        <div class="card settings-mgmt-btn" data-goto="menu" style="cursor:pointer;padding:18px;text-align:center;transition:transform .15s;"><div style="font-size:28px;margin-bottom:6px;">📋</div><div style="font-weight:600;">Menu</div></div>
        <div class="card settings-mgmt-btn" data-goto="inventory" style="cursor:pointer;padding:18px;text-align:center;transition:transform .15s;"><div style="font-size:28px;margin-bottom:6px;">📦</div><div style="font-weight:600;">Inventory</div></div>
        <div class="card settings-mgmt-btn" data-goto="reports" style="cursor:pointer;padding:18px;text-align:center;transition:transform .15s;"><div style="font-size:28px;margin-bottom:6px;">📈</div><div style="font-weight:600;">Reports</div></div>
        <div class="card settings-mgmt-btn" data-goto="crm" style="cursor:pointer;padding:18px;text-align:center;transition:transform .15s;"><div style="font-size:28px;margin-bottom:6px;">👥</div><div style="font-weight:600;">Customers</div></div>
        <div class="card settings-mgmt-btn" data-goto="staff" style="cursor:pointer;padding:18px;text-align:center;transition:transform .15s;"><div style="font-size:28px;margin-bottom:6px;">🧑‍🍳</div><div style="font-weight:600;">Staff</div></div>
      </div>
    </div>

    <h3 style="margin-bottom:12px;font-size:16px;font-weight:700;color:var(--text);">🔧 Configuration</h3>
    <div class="settings-grid">
      <div class="card">
        <div class="card-header">🏪 Restaurant Info</div>
        <div class="settings-form">
          <div class="form-group"><label>Name</label><input type="text" id="settingName" value="${s.restaurantName || 'King Chinese Bowl'}"></div>
          <div class="form-group"><label>Phone</label><input type="text" id="settingPhone" value="${s.phone || ''}"></div>
          <div class="form-group"><label>Address</label><input type="text" id="settingAddress" value="${s.address || ''}"></div>
          <div class="form-group"><label>GST No.</label><input type="text" id="settingGstNo" value="${s.gstNo || ''}"></div>
          <div class="form-group"><label>Cashier Name</label><input type="text" id="settingCashier" value="${s.cashierName || 'Admin'}"></div>
          <div class="form-group"><label>Bill Footer Text</label><input type="text" id="settingFooter" value="${s.footerText || 'Thanks For Ordering !!'}"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">🔑 Admin Login Credentials</div>
        <div class="settings-form">
          <div class="form-group"><label>Admin Username</label><input type="text" id="settingAdminUser" value="${s.adminUser || 'admin'}"></div>
          <div class="form-group"><label>Admin Password</label><input type="password" id="settingAdminPass" value="${s.adminPass || 'admin123'}"></div>
          <p style="font-size:11px;color:#999;margin-top:4px;">💡 Staff credentials are managed in Settings → Staff Management</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">💰 Tax & Billing</div>
        <div class="settings-form">
          <div class="form-group"><label>GST Rate</label><select id="settingGstRate"><option value="0" ${sel(s.gstRate, 0)}>0%</option><option value="5" ${sel(s.gstRate, 5)}>5%</option><option value="12" ${sel(s.gstRate, 12)}>12%</option><option value="18" ${sel(s.gstRate, 18)}>18%</option><option value="28" ${sel(s.gstRate, 28)}>28%</option></select></div>
          <div class="form-group"><label>Service Charge</label><select id="settingSvcCharge"><option value="0" ${sel(s.serviceCharge, 0)}>0%</option><option value="5" ${sel(s.serviceCharge, 5)}>5%</option><option value="10" ${sel(s.serviceCharge, 10)}>10%</option><option value="15" ${sel(s.serviceCharge, 15)}>15%</option></select></div>
          <div class="form-group"><label>Invoice Prefix</label><input type="text" id="settingPrefix" value="${s.invoicePrefix || 'KCB-'}"></div>
          <div class="form-group"><label>Daily Goal (₹)</label><input type="number" id="settingGoal" value="${s.dailyGoal || 40000}"></div>
          <div class="form-group"><label>Change PIN (6-digit)</label><input type="password" id="settingPin" maxlength="6" pattern="[0-9]{6}" value="${s.settingsPin || '000000'}" style="letter-spacing:6px;font-weight:bold;"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">🖨️ Printer / KOT</div>
        <div class="settings-form">
          <div class="form-group"><label>KOT Printer</label><select id="settingKotPrinter"><option value="thermal-kitchen" ${sel(s.kotPrinter, 'thermal-kitchen')}>Thermal — Kitchen</option><option value="impact-bar" ${sel(s.kotPrinter, 'impact-bar')}>Impact — Bar</option><option value="wifi-kitchen" ${sel(s.kotPrinter, 'wifi-kitchen')}>WiFi — Kitchen</option></select></div>
          <div class="form-group"><label>Bill Printer</label><select id="settingBillPrinter"><option value="thermal-cashier" ${sel(s.billPrinter, 'thermal-cashier')}>Thermal — Cashier</option><option value="a4-cashier" ${sel(s.billPrinter, 'a4-cashier')}>A4 — Cashier</option></select></div>
          <div class="form-group"><label>Auto Print KOT</label><div class="avail-toggle ${s.autoPrintKOT ? 'on' : 'off'}" id="toggleAutoPrintKOT"><span class="toggle-knob"></span></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">🎨 Appearance</div>
        <div class="settings-form">
          <div class="form-group"><label>Theme</label><select id="settingTheme"><option value="light" ${sel(s.theme, 'light')}>Light</option><option value="dark" ${sel(s.theme, 'dark')}>Dark</option></select></div>
          <div class="form-group"><label>Sound Effects</label><div class="avail-toggle ${s.soundEffects ? 'on' : 'off'}" id="toggleSoundEffects"><span class="toggle-knob"></span></div></div>
          <div class="form-group"><label>Compact Mode</label><div class="avail-toggle ${s.compactMode ? 'on' : 'off'}" id="toggleCompactMode"><span class="toggle-knob"></span></div></div>
        </div>
      </div>
    </div>
  </div>`;
}
