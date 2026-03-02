-- KCB POS — D1 Database Schema

-- Orders table (completed orders)
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Settings table (key-value store)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Running/held orders
CREATE TABLE IF NOT EXISTS running_orders (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Order counter
INSERT OR IGNORE INTO settings (key, value) VALUES ('orderCounter', '1000');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
