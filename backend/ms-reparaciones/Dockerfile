FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-reparaciones.jar
ENTRYPOINT ["java","-jar","/ms-reparaciones.jar"]