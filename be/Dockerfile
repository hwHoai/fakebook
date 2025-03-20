FROM openjdk:23
WORKDIR /app
COPY start/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
EXPOSE ${BE_PORT}
