function pull_recent(){
    
    fetch('https://haveibeenpwned.com/api/v3/breaches')
        .then(response => response.json())
        .then(breach_objects => {
            console.log(breach_objects)
            // Lit sort
            let recent_breaches = breach_objects.sort((date1,date2)=>new Date(date1['AddedDate']).getTime() - new Date(date2['AddedDate']).getTime())
            console.log("BREACH => ", recent_breaches);
            return recent_breaches
        })
        .then(sorted_stream => {
            handel_data(sorted_stream);
        })
}

function handel_data(data){
    let total_records = data['length'];
    let recent_breaches = [
        data[total_records - 1],
        data[total_records - 2],
        data[total_records - 3],
        data[total_records - 4],
        data[total_records - 5]
    ]

    let inject_point = document.getElementById('cd-timeline');

    // LOOP THROUGH RECENT RECORDS

    recent_breaches.forEach(breach => {

        let breach_title = breach['Name'];
        let added_date = breach['AddedDate'].split("T")[0];
        let breach_description = breach['Description'];
        let stolen_data_array = breach['DataClasses'];
        let list_string = "";
        
        stolen_data_array.forEach(record => {
            list_string += "<li>" + record + "</li>"
        });

        let breached_date = breach['BreachDate'];

        inject_point.innerHTML +=   "<div class='cd-timeline-block'>" +
                                        "<div class='cd-timeline-img cd-picture'>" +
                                    "</div>" +
                                        "<div class='cd-timeline-content'>" +
                                            "<h2 id='Name'>" + breach_title + "</h2>" +
                                                "<div class='timeline-content-info'>" +
                                                "<span id='AddedDate' class='timeline-content-info-title'>" +
                                                    "<i class='fa fa-certificate' aria-hidden='true'></i>" +
                                                    added_date +
                                                "</span>" +
                                                "</div>" +
                                            "<p id='Description'>" + breach_description + "</p>" +
                                            "<ul id='DataClasses' class='content-skills'>" +
                                                list_string +
                                            "</ul>" +
                                            "<span class='cd-date'>Breached => <span id='BreachDate'>" + breached_date + "</span></span>" +
                                        "</div>" +
                                    "</div>"
    });

    
}

pull_recent();