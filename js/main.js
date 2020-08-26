function pull_recent(){
    let dump_loc = document.getElementById('dump_loc');

    fetch('https://haveibeenpwned.com/api/v3/breaches')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            handel_data(data);
        });
}

function handel_data(data){
   // console.log("TOTAL RECORDS => ", data['length']);
    let total_records = data['length'];
    //console.log("MOST RECENT BREACH => ", data[total_records - 1]);

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
        //console.log("Breach =>", breach);

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

function test_sort(dates) {

}

pull_recent();