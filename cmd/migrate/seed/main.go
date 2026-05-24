package main

import (
	"log"

	"github.com/mert-sayar/GoSocial/internal/db"
	"github.com/mert-sayar/GoSocial/internal/env"
	"github.com/mert-sayar/GoSocial/internal/store"
)

func main() {
	addr := env.GetString("DB_ADDR", "postgresql://admin:adminpassword@localhost/gosocial?sslmode=disable")
	conn, err := db.New(addr, 3, 3, "15m")
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()

	store := store.NewStorage(conn)

	db.Seed(store)
}
