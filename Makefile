start:
	docker-compose up -d \
	&& sleep 15s \
	&& docker-compose exec db bash -c "mysql -uroot -p123456  < /sql/migrations/tickets/migration_20190211.sql" \
	&& docker-compose exec db bash -c "mysql -uroot -p123456  < /sql/migrations/payments/migration_20190213.sql"