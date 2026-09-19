# SkillSwap

SkillSwap is a full-stack skill exchange platform that helps students connect with other learners, exchange skills, send collaboration requests, communicate through chat, and share feedback.

## Features

* User registration and login
* User profiles with bio and skills
* Skills users can teach
* Skills users want to learn
* Find and discover skill partners
* Skill-based matching
* Send and manage skill swap requests
* Accept or reject requests
* One-to-one chat between accepted partners
* Edit and delete sent messages
* Ratings and feedback
* Average user rating display

## Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* MySQL

### Frontend

* HTML
* CSS
* JavaScript

### Tools

* IntelliJ IDEA
* Postman
* Git
* GitHub
* Maven

## Project Architecture

```text
Frontend
   ↓
Spring Boot REST API
   ↓
Controller
   ↓
Service / Business Logic
   ↓
Repository
   ↓
MySQL Database
```

## Main Modules

### User Management

Handles user registration, login, profiles, skills and learning preferences.

### Skill Matching

Helps users discover other users based on the skills they want to learn.

### Swap Requests

Users can send skill exchange requests and accept or reject incoming requests.

### Chat

Accepted partners can communicate through one-to-one messaging with support for editing and deleting sent messages.

### Rating & Feedback

Users can rate their skill partners and provide feedback. Average ratings are displayed on partner profiles/cards.

## Database

The application uses MySQL with entities/tables for:

* Users
* Skills
* User Skills
* Skills to Learn
* Swap Requests
* Messages
* Ratings

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/ashmitkothar/SkillSwap.git
cd SkillSwap
```

### 2. Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE skillswap;
```

Configure your local database credentials in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillswap
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### 3. Run the Spring Boot application

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

### 4. Open the application

```text
http://localhost:8080/login.html
```

## Project Structure

```text
SkillSwap
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.skillswap
│   │   │       ├── controller
│   │   │       ├── repository
│   │   │       ├── Message.java
│   │   │       ├── Rating.java
│   │   │       ├── Skill.java
│   │   │       ├── SwapRequest.java
│   │   │       ├── User.java
│   │   │       └── SkillswapApplication.java
│   │   │
│   │   └── resources
│   │       └── static
│   │           ├── login.html
│   │           ├── register.html
│   │           ├── users.html
│   │           ├── requests.html
│   │           ├── chat.html
│   │           └── rating.html
│   │
│   └── test
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

## Future Enhancements

* AI-powered smart skill matching
* Skill gap analysis
* AI profile assistant
* Personalized skill recommendations
* Better authentication and authorization
* Real-time chat using WebSocket
* User notifications
* Advanced search and filters

## Author

**Ashmit Kothar**

GitHub: https://github.com/ashmitkothar

## Repository

https://github.com/ashmitkothar/SkillSwap

