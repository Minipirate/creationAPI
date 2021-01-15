let Lesson = require('../models/lesson');

exports.checkFinished = (lesson) => {
    let now = Date.now();
    console.log(lesson.id);
       if (now > lesson.ending_date) {
           let reLesson = new Lesson(lesson.id, lesson.title, lesson.hours, lesson.description, lesson.teacher, lesson.file_name, lesson.starting_date, lesson.ending_date, true)
           console.log(reLesson)
           return reLesson

       } else {
           let reLesson = new Lesson(lesson.id, lesson.title, lesson.hours, lesson.description, lesson.teacher, lesson.file_name, lesson.starting_date, lesson.ending_date, false)
                      console.log(reLesson)
           return reLesson

       }
}