const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "project"
        }
    ],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

TeamSchema.statics.addProjectToTeam = (teamId, projectId) => {
    const Team = mongoose.model("team");
    const Project = mongoose.model("project");

    return Team.findById(teamId).then(team => 
        Project.findById(projectId).then(project => {
            team.projects.pull(project)
            team.projects.push(project)
            return team.save().then(team => team)
        }))
}

module.exports = mongoose.model("team", TeamSchema);