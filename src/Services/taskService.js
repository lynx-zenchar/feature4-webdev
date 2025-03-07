//// filepath: ./Services/taskService.js

import axios from "axios";

// Define the URL where the static tasks.json is served from (in "public/data")
const API_URL = "/data/tasks.json";

const taskService = {
  // Method for loading tasks from the JSON file
  getTasks: async () => {
    try {
      const response = await axios.get(API_URL);
      // Return the task array from tasks.json
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },
};

export default taskService;
