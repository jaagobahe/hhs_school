
export const getGradePoint = (totalMarks: number): number => {
    if (totalMarks >= 80) return 5.0;
    if (totalMarks >= 70) return 4.0;
    if (totalMarks >= 60) return 3.5;
    if (totalMarks >= 50) return 3.0;
    if (totalMarks >= 40) return 2.0;
    if (totalMarks >= 33) return 1.0;
    return 0.0;
};

export const getGradeLetter = (totalMarks: number): string => {
    if (totalMarks >= 80) return 'A+';
    if (totalMarks >= 70) return 'A';
    if (totalMarks >= 60) return 'A-';
    if (totalMarks >= 50) return 'B';
    if (totalMarks >= 40) return 'C';
    if (totalMarks >= 33) return 'D';
    return 'F';
};

export const calculateTotalGpa = (subjectGpas: { gpa: number, isOptional: boolean }[]): { gpa: number, grade: string } => {
    let totalPoints = 0;
    let totalSubjects = 0;
    let hasFailed = false;
    
    subjectGpas.forEach(subject => {
        if (!subject.isOptional) {
            totalPoints += subject.gpa;
            totalSubjects++;
            if (subject.gpa === 0.0) {
                hasFailed = true;
            }
        }
    });

    const optionalSubject = subjectGpas.find(s => s.isOptional);
    if(optionalSubject && optionalSubject.gpa > 2.0) {
        totalPoints += (optionalSubject.gpa - 2.0);
    }
    
    if (hasFailed) {
        return { gpa: 0.00, grade: 'F' };
    }

    if (totalSubjects === 0) {
        return { gpa: 0.00, grade: 'N/A' };
    }

    const averageGpa = totalPoints / totalSubjects;
    const finalGpa = Math.min(5.0, parseFloat(averageGpa.toFixed(2)));

    let finalGrade = 'F';
    if (finalGpa === 5.0) finalGrade = 'A+';
    else if (finalGpa >= 4.0) finalGrade = 'A';
    else if (finalGpa >= 3.5) finalGrade = 'A-';
    else if (finalGpa >= 3.0) finalGrade = 'B';
    else if (finalGpa >= 2.0) finalGrade = 'C';
    else if (finalGpa >= 1.0) finalGrade = 'D';

    return { gpa: finalGpa, grade: finalGrade };
};
