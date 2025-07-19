-- Seed data for PicsWord platform
-- This script populates the database with initial data

-- Insert default categories
INSERT INTO categories (name, description) VALUES
('Nature', 'Beautiful landscapes, wildlife, and natural scenery'),
('Architecture', 'Buildings, structures, and urban photography'),
('People', 'Portraits, lifestyle, and human photography'),
('Technology', 'Gadgets, innovation, and tech-related imagery'),
('Abstract', 'Artistic and conceptual photography'),
('Animals', 'Wildlife and pet photography'),
('Food', 'Culinary photography and food styling'),
('Travel', 'Destinations, cultures, and travel photography'),
('Art', 'Creative and artistic expressions'),
('Sports', 'Athletic activities and sports photography')
ON CONFLICT (name) DO NOTHING;

-- Insert default admin user
INSERT INTO users (email, name, role) VALUES
('admin@picsword.in', 'PicsWord Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert some sample tags
INSERT INTO tags (name) VALUES
('landscape'),
('sunset'),
('mountain'),
('ocean'),
('city'),
('portrait'),
('black-and-white'),
('vintage'),
('modern'),
('colorful'),
('minimalist'),
('dramatic'),
('peaceful'),
('urban'),
('rural')
ON CONFLICT (name) DO NOTHING;

-- Note: Sample images and other data would be inserted here
-- In a real application, you would add sample images with proper URLs
-- and associate them with categories and tags
