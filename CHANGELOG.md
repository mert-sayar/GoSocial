# Changelog

## 1.0.0 (2026-10-12)


### Features

* add feed filtering ([ae47b32](https://github.com/mert-sayar/GoSocial/commit/ae47b326520d8731aa50c757ad943168411efe02))
* add followers table migration and follow/unfollow handlers ([6edb783](https://github.com/mert-sayar/GoSocial/commit/6edb783a458502dd9a271da808ace90d45b0c7c9))
* add indexes for search and performance ([546d8fa](https://github.com/mert-sayar/GoSocial/commit/546d8fad9d86da2e618128a8ef47a181ff9393ef))
* add pagination and sorting to user feed ([6791494](https://github.com/mert-sayar/GoSocial/commit/6791494d56fede99227d420fdb72194a5ef5b046))
* add user profile creation endpoint ([a6a6026](https://github.com/mert-sayar/GoSocial/commit/a6a6026c7cc6a5cc976967e827db4748a0b9d011))
* **auth:** add jwt token generation and authentication endpoint ([d4c227b](https://github.com/mert-sayar/GoSocial/commit/d4c227bf31877605c8637644a20563b13e372b27))
* **auth:** implement basic authentication middleware and error handling ([1f1369a](https://github.com/mert-sayar/GoSocial/commit/1f1369aeb09a3ea33581e574ace8ad35d067ef5a))
* **auth:** implement user registration with transactional invitation ([5932eb2](https://github.com/mert-sayar/GoSocial/commit/5932eb27e52b4c0777b5f93fdde9179c5bd9c967))
* **cache:** implement redis caching layer for user lookups ([e7fa3f0](https://github.com/mert-sayar/GoSocial/commit/e7fa3f08d1027641a289215d284d3f3d1051d402))
* **db:** add roles table and link role_id to users ([24bd448](https://github.com/mert-sayar/GoSocial/commit/24bd448997702c60d175ba1873d22453c743ec03))
* implement user feed algorithm ([de7f918](https://github.com/mert-sayar/GoSocial/commit/de7f9187933c10f0b409bbfaf18198c38d5ae203))
* **mailer:** add user invitation email flow with SendGrid ([3076ae0](https://github.com/mert-sayar/GoSocial/commit/3076ae0bd37889efab527df47e2896711fe40c41))
* **main:** add basic server metrics ([c76ca17](https://github.com/mert-sayar/GoSocial/commit/c76ca17994566bc5f9b9a60f6c14d3964e7805de))
* **main:** add CORS configuration ([8f7d0a2](https://github.com/mert-sayar/GoSocial/commit/8f7d0a288350b997072db8e78139fce9daa770fe))
* **main:** add graceful server shutdown ([e26e58e](https://github.com/mert-sayar/GoSocial/commit/e26e58e8c76e8ce9f447c597f425b93d4173998a))
* **main:** add role precedence and post ownership authorization middleware ([100f865](https://github.com/mert-sayar/GoSocial/commit/100f865f2e0a0f75d21f7fe7904bb37ee7fecf09))
* **main:** implement JWT AuthTokenMiddleware and inject authenticated user into context ([3bdfd2e](https://github.com/mert-sayar/GoSocial/commit/3bdfd2e1a4455f0abc99cc3721000a1c3be473fd))
* setup swagger documentation and auto generation ([70daae6](https://github.com/mert-sayar/GoSocial/commit/70daae6d8a1642754aeb31b66b6f1771e0bc9729))
* **users:** add user activation endpoint with invitation token ([502e4ce](https://github.com/mert-sayar/GoSocial/commit/502e4cef75133b7fd78d7bbed21b0465bf00d0c8))


### Bug Fixes

* **main:** remove unused userContextMiddleware ([c383dcc](https://github.com/mert-sayar/GoSocial/commit/c383dcc8a81beedfb73be38df0dec31b158efdcc))
* **main:** verify user password before generating token ([d8b18fd](https://github.com/mert-sayar/GoSocial/commit/d8b18fd4a4481ccc25534cf2d6945c0931ac2e1d))
* **store:** assign default user role during user creation ([3ac3289](https://github.com/mert-sayar/GoSocial/commit/3ac32899d600813d64645b7fd02da466059d53dc))
