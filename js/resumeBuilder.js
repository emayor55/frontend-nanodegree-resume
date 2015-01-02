var bio = {
	"name": "Kuperbrad Lee",
	"role": "Web Developer Extraordinaire",
	"contacts": {
		"mobile": "732-555-5555",
		"email": "anon@gmail.com",
		"github": "anon",
		"twitter": "@anonymouse",
		"location":"Middletown, NJ"
	},
	"welcomeMessage": "Yes, most folks think I look like that famous actor and that really annoys me ...",
	"skills": ["Sleepwalking", "Binge Eating", "Yodelling", "Panhandling","Fire Eating","Daydreaming","Taxidermy","Mortuary for the Living"],
	"biopic": "images/me.jpg",
	"display" : function () {
	if (bio.role) {
		var formattedheaderRole = HTMLheaderRole.replace("%data%",bio.role);
		$("#header").prepend(formattedheaderRole);
	}
	if (bio.name) {
		var formattedheaderName = HTMLheaderName.replace("%data%",bio.name);
		$("#header").prepend(formattedheaderName);
	}
	if (bio.biopic) {
		var formattedbioPic = HTMLbioPic.replace("%data%",bio.biopic)
		$("#header").append(formattedbioPic);
	}
	var formattedcontactGeneric = HTMLcontactGeneric.replace("%contact%","availability");
	formattedcontactGeneric = formattedcontactGeneric.replace("%data%","24 X 7");
	$("#topContacts").append(formattedcontactGeneric);
	$("#footerContacts").append(formattedcontactGeneric);
	if (bio.contacts.mobile) {
		var formattedmobile = HTMLmobile.replace("%data%",bio.contacts.mobile);
		$("#topContacts").append(formattedmobile);
		$("#footerContacts").append(formattedmobile);
	}
	if (bio.contacts.email) {
		var formattedemail = HTMLemail.replace("%data%",bio.contacts.email);
		$("#topContacts").append(formattedemail);
		$("#footerContacts").append(formattedemail);
	}
	if (bio.contacts.twitter) {
		var formattedtwitter = HTMLtwitter.replace("%data%",bio.contacts.twitter);
		$("#topContacts").append(formattedtwitter);
		$("#footerContacts").append(formattedtwitter);
	}
	if (bio.contacts.github) {
		var formattedgithub = HTMLgithub.replace("%data%",bio.contacts.github);
		$("#topContacts").append(formattedgithub);
		$("#footerContacts").append(formattedgithub);
	}
	if (bio.contacts.blog) {
		var formattedblog = HTMLblog.replace("%data%",bio.contacts.blog);
		$("#topContacts").append(formattedblog);	
		$("#footerContacts").append(formattedblog);	
	}
	if (bio.contacts.location) {
		var formattedlocation = HTMLlocation.replace("%data%",bio.contacts.location);
		$("#topContacts").append(formattedlocation);
		$("#footerContacts").append(formattedlocation);
	}
	if (bio.welcomeMessage) {
		var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%",bio.welcomeMessage);
		$("#header").append(formattedWelcomeMsg);
	}
	if (bio.skills.length > 0 ) {
		$("#header").append(HTMLskillsStart);
		for (i=0; i < bio.skills.length; i ++) {
			formattedskill = HTMLskills.replace("%data%",bio.skills[i]);
	    	$("#skills").append(formattedskill);
		    }
	}
	}
};

var work = {
	"jobs" : [ {
	"title" : "Entry-level Programmer",
	"desc": "Implement new software based on user requirements. A programmer, computer programmer, developer, coder, or software engineer is a person who writes computer software. The term computer programmer can refer to a specialist in one area of computer programming or to a generalist who writes code for many kinds of software. One who practices or professes a formal approach to programming may also be known as a programmer analyst.",
	"employer" : "Big Company",
	"dates" : "1995-1999",
	"location":"New Delhi, INDIA" 
}, 
{
	"title" : "Lead Programmer",
	"employer" : "Extra Big Company",
	"desc": "Manage a group of 3 programmers and act as the Technical Lead for the Team. Members of these professions possess other software engineering skills, beyond programming. A programmer, computer programmer, developer, coder, or software engineer is a person who writes computer software. The term computer programmer can refer to a specialist in one area of computer programming or to a generalist who writes code for many kinds of software. One who practices or professes a formal approach to programming may also be known as a programmer analyst.",
	"dates" : "1999-2000",
	"location":"Paris, FRANCE" 
}, 
{
	"title" : "Chief Information Officer",
	"employer" : "Super Big Company",
	"desc": "Set the Information Technology strategy for the company; manage an annual budget of $50 million dollars. A programmer's primary computer language (C, C++, C#, Java, Lisp, Python, etc.) is often prefixed to the above titles, and those who work in a web environment often prefix their titles with Web. The term programmer can be used to refer to a software developer, Web developer, mobile applications developer, embedded firmware developer, software engineer, computer scientist, or software analyst. However, members of these professions possess other software engineering skills, beyond programming; for this reason, the term programmer, or code monkey, is sometimes considered an insulting or derogatory oversimplification of these other professions.[1] This has sparked much debate amongst developers, analysts, computer scientists, programmers, and outsiders who continue to be puzzled at the subtle differences in the definitions of these occupations.",
	"dates" : "2000-present",
	"location":"London, ENGLAND" 
}
],
	"display": function () {
	for (job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);
		if (work.jobs[job].employer) {
			var formattedworkEmployer=HTMLworkEmployer.replace("%data%",work.jobs[job].employer); 
		} else {
			var formattedworkEmployer=HTMLworkEmployer.replace("%data%",""); 
		}
		if (work.jobs[job].title) {
			var formattedworkTitle=HTMLworkTitle.replace("%data%",work.jobs[job].title);
		}  else {
			var formattedworkTitle=HTMLworkTitle.replace("%data%",""); 
		}
		$(".work-entry:last").append(formattedworkEmployer + formattedworkTitle);
		if (work.jobs[job].dates) {
			var formattedworkDates=HTMLworkDates.replace("%data%",work.jobs[job].dates);
			$(".work-entry:last").append(formattedworkDates);
		}
		if (work.jobs[job].location) {
			var formattedworkLocation=HTMLworkLocation.replace("%data%",work.jobs[job].location);
			$(".work-entry:last").append(formattedworkLocation);
		}
		if (work.jobs[job].desc) {
			var formattedworkDescription=HTMLworkDescription.replace("%data%",work.jobs[job].desc);
			$(".work-entry:last").append(formattedworkDescription);
		}
	}
}
};


var projects = {
	"project" : [ {
	"title": "An Awesome Web Portal",
	"desc": "This is a top-secret project and no information can be divulged. Just trust me on this, it is honestly awesome.",
	"image": "images/proj1.jpg",
	"dates": "Jan 2000 - June 2000"
	},
	{
	"title": "I WISH ..Web Portal",
	"desc": "This web portal offers to registered end-users the realization of three of their most fervent wishes in exchange for their most sensitive personal information - (Social Security Number, all their Credit Card numbers, all their user id's and passwrords). These bits and pieces of personal information are fed as initializng arguemnts for a very complex algorithm that then grants a user's specified wishes.",
	"image": "images/proj2.jpg",
	"dates": "July 2000 - future"
	}
   ],
   "display": function () {
	if (projects) {
     for (i=0; i < projects.project.length; i++) {
     	$("#projects").append(HTMLprojectStart);
    	if (projects.project[i].title) {
     		var formattedprojectTitle=HTMLprojectTitle.replace("%data%",projects.project[i].title); 
			$(".project-entry:last").append(formattedprojectTitle);
    	} 
        if (projects.project[i].dates){
	        var formattedprojectDates=HTMLprojectDates.replace("%data%",projects.project[i].dates); 
			$(".project-entry:last").append(formattedprojectDates);
        } 
        if (projects.project[i].desc){
        	var formattedprojectDescription=HTMLprojectDescription.replace("%data%",projects.project[i].desc); 
        	$(".project-entry:last").append(formattedprojectDescription);
		}
        if (projects.project[i].image){
     		var formattedprojectImage=HTMLprojectImage.replace("%data%",projects.project[i].image); 
			$(".project-entry:last").append(formattedprojectImage);        	
        } 
 	}
   }
}
};

var education = {
	"schools" : [
	{"name": "University of Minnesota",
	"location": "Minneapolis, MN",
	"degree": "Master of Science",
	"majors": ["Mindful Processing"],
	"dates": 1983,
	"url": "www.uofm.edu"
	},
	{"name": "East West Center",
	"location": "Honolulu, HI",
	"degree": "Bachelor of Science",
	"majors": ["Hare Science"],
	"dates": 1979,
	"url": "www.ewc.edu",
	},
	{"name": "Moscow High School of Science",
	"location": "Moscow, Russia",
	"degree": "",
	"majors": "",
	"dates": 1973,
	"url":""
	}		
],
	"onlineCourses" : [ 
	{ 	"title": "Intro to Hadoop and MapReduce",
		"school": "Udacity",
		"date":2014,
		"url":"https://www.udacity.com/course/ud617"
	}, 
	{	"title": "The Fundamentals of Everything",
		"school": "Coursera",
		"date":2013,
		"url":""
	},
	{	"title": "Discover Dev Tools",
		"school": "Code School",
		"date":2014,
		"url":"https://www.codeschool.com/courses/discover-devtools"
	}	
	],
	"display": function () {
	if (education.schools.length > 0) {
			for (inst in education.schools) {
			$("#education").append(HTMLschoolStart);
			if (education.schools[inst].name) {
				var formattedschoolName = HTMLschoolName.replace("%data%",education.schools[inst].name);
			} else {
				var formattedschoolName = HTMLschoolName.replace("%data%","");
			}

			if (education.schools[inst].degree) {
				var formattedschoolDegree = HTMLschoolDegree.replace("%data%",education.schools[inst].degree);
			} else {
				var formattedschoolDegree = HTMLschoolDegree.replace("%data%","");
			}
			$(".education-entry:last").append(formattedschoolName + formattedschoolDegree);
			if (education.schools[inst].dates) {
				var formattedschoolDates = HTMLschoolDates.replace("%data%",education.schools[inst].dates);
				$(".education-entry:last").append(formattedschoolDates);
			}
			if (education.schools[inst].location) {
				var formattedschoolLocation = HTMLschoolLocation.replace("%data%",education.schools[inst].location);
				$(".education-entry:last").append(formattedschoolLocation);
			}
			if (education.schools[inst].majors) {
				for (major in education.schools[inst].majors) {
					var formattedschoolMajor = HTMLschoolMajor.replace("%data%",education.schools[inst].majors[major]);
					$(".education-entry:last").append(formattedschoolMajor);
				}
			}
		}
	}
	if (education.onlineCourses.length > 0) {
		$(".education-entry:last").append('<br>');	
		$(".education-entry:last").append(HTMLonlineClasses);
		for (course in education.onlineCourses) {
			if (education.onlineCourses[course].title) {
				var formattedonlineTitle = HTMLonlineTitle.replace("%data%",education.onlineCourses[course].title)
			} else {
				var formattedonlineTitle = HTMLonlineTitle.replace("%data%","")
			}
			if (education.onlineCourses[course].school) {
				var formattedonlineSchool = HTMLonlineSchool.replace("%data%",education.onlineCourses[course].school)
			} else {
				var formattedonlineSchool = HTMLonlineSchool.replace("%data%","")
			}
			$(".education-entry:last").append(formattedonlineTitle + formattedonlineSchool);
			if (education.onlineCourses[course].date) {
				var formattedonlineDate = HTMLonlineDates.replace("%data%",education.onlineCourses[course].date)
				$(".education-entry:last").append(formattedonlineDate);
			}
			if (education.onlineCourses[course].url) {
				var formattedonlineURL = HTMLonlineURL.replace("%data%",education.onlineCourses[course].url)
				$(".education-entry:last").append(formattedonlineURL);
			} else {
				$(".education-entry:last").append('<br></br>')
			}
		}
	}
}
};

bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap); 

