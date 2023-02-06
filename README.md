# Yard Sale Backend
Uses:

### Docker Commands
**Run postgres and Pgadmin Docker**
```
docker-compose up -d postgres
docker-compose up -d pgadmin
```

**List Docker Process**
```
docker-compose ps
```

**Kill Process**
```
docker-compose down
```

```
docker-compose down postgres
```
**Conect to DB from Docker**

```sh
docker-compose exec postgres bash
psql -h localhost -d my_store -U devferx
\d+
SELECT * FROM users;
DELETE FROM users where id =<id>;
```
