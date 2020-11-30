CREATE TRIGGER user_delete_tokens
AFTER DELETE ON users
FOR EACH ROW
BEGIN
    DELETE FROM user_tokens WHERE user_id = OLD.id;
END

CREATE TRIGGER user_delete_artist_profile
AFTER DELETE ON users
FOR EACH ROW
BEGIN
    DELETE FROM artist_profiles WHERE id = OLD.artist_id;
END

CREATE TRIGGER artist_delete_products
AFTER DELETE ON artist_profiles
FOR EACH ROW
BEGIN
    DELETE FROM products WHERE artist_id = OLD.id;
END
