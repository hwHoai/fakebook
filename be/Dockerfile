FROM openjdk:23
WORKDIR /app
COPY start/target/*-exec.jar app.jar
CMD ["java", "-jar", "app.jar"]
EXPOSE 8080
