
CREATE TABLE IF NOT EXISTS locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    latitude DOUBLE,
    longitude DOUBLE
);

INSERT INTO locations (name, description, latitude, longitude) VALUES
('Lugar A', 'Descripción de A', 19.231, -97.773),
('Lugar B', 'Descripción de B', 19.232, -97.774),
('Lugar C', 'Descripción de C', 19.233, -97.775);
