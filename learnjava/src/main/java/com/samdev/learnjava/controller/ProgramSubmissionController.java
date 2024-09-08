package com.samdev.learnjava.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.samdev.learnjava.repository.JavaSubmissionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/submissions")
public class ProgramSubmissionController {

    @Autowired
    private JavaSubmissionRepository submissionRepository;

    @PostMapping("/run")
    public ResponseEntity<String> runJavaProgram(@RequestBody String javaCode) {
        String className = extractClassName(javaCode);

        if (className == null) {
            return ResponseEntity.badRequest().body("Invalid Java code. No class name found.");
        }

        String output = runJavaCode(javaCode, className);

        return ResponseEntity.ok(output);
    }

    private String extractClassName(String javaCode) {
        Pattern pattern = Pattern.compile("public class\\s+(\\w+)");
        Matcher matcher = pattern.matcher(javaCode);

        if (matcher.find()) {
            return matcher.group(1);
        }

        return null;
    }

    private String runJavaCode(String javaCode, String className) {
        Path javaFilePath = Paths.get(className + ".java");
        Path classFilePath = Paths.get(className + ".class");

        try {
            Files.write(javaFilePath, javaCode.getBytes());

            ProcessBuilder compileProcessBuilder = new ProcessBuilder("javac", javaFilePath.toString());
            Process compileProcess = compileProcessBuilder.start();
            compileProcess.waitFor();

            String compileErrors = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()))
                    .lines()
                    .reduce("", (acc, line) -> acc + line + "\n");

            if (!compileErrors.isEmpty()) {
                return "Compilation errors:\n" + compileErrors;
            }

            ProcessBuilder runProcessBuilder = new ProcessBuilder("java", className);
            Process runProcess = runProcessBuilder.start();
            runProcess.waitFor();

            String output = new BufferedReader(new InputStreamReader(runProcess.getInputStream()))
                    .lines()
                    .reduce("", (acc, line) -> acc + line + "\n");

            String runtimeErrors = new BufferedReader(new InputStreamReader(runProcess.getErrorStream()))
                    .lines()
                    .reduce("", (acc, line) -> acc + line + "\n");

            if (!runtimeErrors.isEmpty()) {
                return "Runtime errors:\n" + runtimeErrors;
            }

            return output;

        } catch (IOException | InterruptedException e) {
            return "Error occurred: " + e.getMessage();
        } finally {
            try {
                Files.deleteIfExists(javaFilePath);
                Files.deleteIfExists(classFilePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}