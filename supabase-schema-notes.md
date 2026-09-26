# Supabase schema

The connected Supabase project `ERP` was initialized with public tables for profiles, categories, units, suppliers, customers, products, purchases, sales, stock movements, expenses and store settings.

RLS is enabled on exposed public tables. The first Auth user is assigned `owner`; later users default to `cashier`.
