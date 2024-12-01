const mongoose = require('mongoose');
const departmentModel = require('../models/department-model');
const candidateModel = require('../models/candidate-model');

async function addData() {
    try {
        // Adding departments
        const departmentData = [
            { name: 'President' },
            { name: 'Sports Secretary' },
            { name: 'Treasurer' },
            { name: 'Event Secretary' },
        ];
        const departments = await departmentModel.insertMany(departmentData);
        console.log('Departments added successfully');

        // Adding candidates
        const candidateData = [
            {
                name: 'Vishal Rai',
                department: departments[0]._id,
                bio: 'As a dedicated and passionate student leader, I am excited to run for the position of President of our college student government. With a strong commitment to serving our community, I have been actively involved in various student organizations and initiatives that promote student welfare, academic excellence, and social responsibility',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Amberish Yadav',
                department: departments[0]._id,
                bio: 'As a dedicated and passionate student leader, I am excited to run for the position of President of our college student government. With a strong commitment to serving our community, I have been actively involved in various student organizations and initiatives that promote student welfare, academic excellence, and social responsibility',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Aman Yadav',
                department: departments[0]._id,
                bio: 'As a dedicated and passionate student leader, I am excited to run for the position of President of our college student government. With a strong commitment to serving our community, I have been actively involved in various student organizations and initiatives that promote student welfare, academic excellence, and social responsibility',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Aditya Gupta',
                department: departments[0]._id,
                bio: 'As a dedicated and passionate student leader, I am excited to run for the position of President of our college student government. With a strong commitment to serving our community, I have been actively involved in various student organizations and initiatives that promote student welfare, academic excellence, and social responsibility',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Satyam Prajapati',
                department: departments[3]._id,
                bio: "As a detail-oriented and organized individual, I am excited to run for the position of Event Secretary. With experience in planning and executing successful events, I am committed to ensuring that our college's events are memorable, engaging, and well-organized.",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Abhishek Yadav',
                department: departments[3]._id,
                bio: "As a detail-oriented and organized individual, I am excited to run for the position of Event Secretary. With experience in planning and executing successful events, I am committed to ensuring that our college's events are memorable, engaging, and well-organized.",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Pranjal Rai',
                department: departments[3]._id,
                bio: "As a detail-oriented and organized individual, I am excited to run for the position of Event Secretary. With experience in planning and executing successful events, I am committed to ensuring that our college's events are memorable, engaging, and well-organized.",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Hafiz Shah',
                department: departments[3]._id,
                bio: "As a detail-oriented and organized individual, I am excited to run for the position of Event Secretary. With experience in planning and executing successful events, I am committed to ensuring that our college's events are memorable, engaging, and well-organized.",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Satvick Rai',
                department: departments[2]._id,
                bio: "As a detail-driven and financially savvy individual, I aim to manage college funds efficiently, promote transparency, and allocate resources to support student activities and initiatives",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Mukund Tripati',
                department: departments[2]._id,
                bio: "As a detail-driven and financially savvy individual, I aim to manage college funds efficiently, promote transparency, and allocate resources to support student activities and initiatives",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Deepak Kumar',
                department: departments[2]._id,
                bio: "As a detail-driven and financially savvy individual, I aim to manage college funds efficiently, promote transparency, and allocate resources to support student activities and initiatives",
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Rahul Pandey',
                department: departments[2]._id,
                bio: 'As a detail-driven and financially savvy individual, I aim to manage college funds efficiently, promote transparency, and allocate resources to support student activities and initiatives',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Divyansh Mehta',
                department: departments[1]._id,
                bio: 'As a passionate athlete and team player, I aim to promote school spirit, improve athletic facilities, and foster a supportive sports community, enhancing the overall college experience',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Ayush Singh',
                department: departments[1]._id,
                bio: 'As a passionate athlete and team player, I aim to promote school spirit, improve athletic facilities, and foster a supportive sports community, enhancing the overall college experience',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Arpit Verma',
                department: departments[1]._id,
                bio: 'As a passionate athlete and team player, I aim to promote school spirit, improve athletic facilities, and foster a supportive sports community, enhancing the overall college experience',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
            {
                name: 'Rohit Sharma',
                department: departments[1]._id,
                bio: 'As a passionate athlete and team player, I aim to promote school spirit, improve athletic facilities, and foster a supportive sports community, enhancing the overall college experience',
                image_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            },
        ];
        const candidates = await candidateModel.insertMany(candidateData);
        console.log('Candidates added successfully');

        // Updating the department with candidate IDs
        for (let candidate of candidates) {
            await departmentModel.findByIdAndUpdate(
                candidate.department,
                { $push: { candidates: candidate._id } }
            );
        }
        console.log('Departments updated with candidate IDs successfully');
    } catch (error) {
        console.error('Error adding data:', error);
    }
}

module.exports = addData;