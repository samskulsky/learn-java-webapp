package com.samdev.learnjava.repository;

import com.samdev.learnjava.model.JavaSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JavaSubmissionRepository extends JpaRepository<JavaSubmission, Long> {
    // TODO: add custom query methods if needed
}