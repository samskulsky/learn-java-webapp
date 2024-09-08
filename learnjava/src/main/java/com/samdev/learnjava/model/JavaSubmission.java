package com.samdev.learnjava.model;

import jakarta.persistence.*;

@Entity
public class JavaSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @Column(length = 10000)
    private String output;

    // Constructors, Getters, and Setters

    public JavaSubmission() {
    }

    public JavaSubmission(String code, String output) {
        this.code = code;
        this.output = output;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }
}