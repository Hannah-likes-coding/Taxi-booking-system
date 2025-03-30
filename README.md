# Taxi-booking-system

- The project is to develop simple web-based taxi booking system, which allows passengers to book taxi services from any of their internet connected computers or mobile phones.
  
- The techniques I use include the Ajax techniques(JavaScript/HTML, XMLHttpRequest, CSS, and DOM), MySQL and PHP. For client-server communication, I use XMLHttpRequest object.

## A list of all the files in the system
![image](https://github.com/user-attachments/assets/e4b94f84-5977-4889-82ea-1ae37b15b8c9)

## Brief instructions on how to use the system

1.	Go to booking.html page
   
2.	Enter the booking information
   
- Notice: the contact phone just only number, and pick-up time have format. Please follow the time format.
   
- When you click the “Book a taxi” button, the input details will be sent after all the information is valid, except unit number.

- After you click the “Book a taxi” button and all the information is valid, the sever side will sent back to you booking reference number automatically. It will show: “Thank you! Your booking reference number is xxxxxx. You will be picked up in front of your provided address at xx:xx on xxxx-xx-xx .”
   
3.	Go to Administration page to enter admin.html for showing your booking information and assigning
   
-	Click the show booking button
Notice: Only show all the booking with a pick-up time within 2 hours from now

-	The table of booking information will be displayed.
   
-	Enter the booking reference number, and then click the assign a taxi button to assign a taxi
   
a)	The booking reference number you enter is number;

b)	The booking reference number you enter is unassigned. If it is valid input, the sever side will display the confirmation information: “The booking request xxxxxx has been properly assigned”; if not, the sever side will display “the booking request xxx is invalid.”


