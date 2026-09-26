# Supabase schema

The connected Supabase project `ERP` was initialized with these public tables:

- user_profiles
- categories
- units
- suppliers
- customers
- products
- purchases / purchase_items
- sales / sale_items
- stock_movements
- expenses
- store_settings

RLS is enabled on all exposed public tables. The first Auth user is assigned `owner`; later users default to `cashier`.
