async function submitCreateCourse () {
    const name = getValue("course-name");
    const description = getValue("course-description");

    let result = await POST("/api/courses/add", {
        name, description
    });

    console.log(result);
}