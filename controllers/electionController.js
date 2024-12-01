const departmentModel = require('../models/department-model');
const candidateModel = require('../models/candidate-model');
const voteModel = require('../models/vote-model');
const userModel = require('../models/user-model');

module.exports.getActiveElection = async (req, res) => {
  const departments = await departmentModel.find();
  res.render('activeelection', { departments });
};

module.exports.getVotingPage = async (req, res) => {
  const { departmentId } = req.params;
  const candidates = await candidateModel.find({ department: departmentId });
  const department = await departmentModel.findById(departmentId);
  res.render('voting', { candidates, department });
};

module.exports.castVote = async (req, res) => {
  const { departmentId, candidateId } = req.body;
  const userid = req.user._id;

  const existingVote = await voteModel.findOne({ voter: userid, department: departmentId });
  if (existingVote) return res.status(400).send('You have already voted for this department');

  await voteModel.create({ voter: userid, department: departmentId, candidate: candidateId });

  const user = await userModel.findById(userid);
  const departmentStatus = user.voting_status.find(status => status.department.toString() === departmentId);

  if (departmentStatus) {
    departmentStatus.voted = true;
  } else {
    user.voting_status.push({ department: departmentId, voted: true });
  }

  user.has_voted = true;
  await user.save();
  await candidateModel.updateOne({ _id: candidateId }, { $inc: { vote_count: 1 } });

  const totalDepartments = 4;
  const votedDepartmentsCount = user.voting_status.filter(status => status.voted).length;

  if (votedDepartmentsCount === totalDepartments) return res.redirect('/thankyou');

  res.redirect('/activeelection');
};

module.exports.thankYou = (req, res) => {
    res.render('thankyou');
}