# Docker Commands for Postgres Container

_First check if you have a postgres image installed_

> `docker images`

---

## Docker Commands

### **Pull the postgres alpine image from universal registry**

> `docker pull postgres:alpine`

### **Check if image is there**

> `docker images`

### **Create docker container using postgres img**

> `docker run --name CONTAINER NAME -e POSTGRES_HOST_AUTH_METHOD=trust -d -p 5432:5432 postgres:alpine`

_choose a container name that fits the application_

### **Run the docker container using bash**

> `docker exec -it CONTAINER NAME bash`

_can now enter commands in container runtime environment_

---

## Container Commands

### **Enter PSQL environment**

> `psql -U postgres`
