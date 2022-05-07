import dotenv from 'dotenv';
import Content from '../models/content.js';

dotenv.config();

// Insert New Content
const newContent = async (req, res) => {
  const { acronym, definition } = req.body;

  if (!acronym || !definition)
    return res.status(400).json({ message: 'Content Missing!' });

  // Check for duplicate record - requirements TBD
  // For now, it checks the acronym
  const isExistingContent = await Content.findOne({ acronym }).exec();
  if (isExistingContent)
    return res.status(400).json({ message: 'Content already exists!' });

  try {
    // Create and store the new content
    const result = await Content.create({
      acronym,
      definition,
    });

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// View All Content
const getAllContent = async (req, res) => {
  const content = await Content.find();
  if (!content) return res.status(200).json([]);
  return res.json(content);
};

// View All Content
// eslint-disable-next-line no-unused-vars
const getContentByID = async (req, res) => {
  // TODO
};

// Delete Requested Content
const deleteContent = async (req, res) => {
  const { id: contentId } = req.params;
  try {
    const content = await Content.findOne({ _id: contentId }).exec();

    if (!content) {
      return res.status(404).json({ message: 'Requested content does not exist!' });
    }
    await content.deleteOne({ _id: contentId });

    return res.status(200).json({ success: 'Content Obliterated!' });
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid Content ID' });

    return res.status(500).json({ message: err.message });
  }
};

// Update Requested Content
async function updateContent(req, res) {
  const { acronym, definition } = req.body;
  const { id: contentId } = req.params;

  try {
    // Find content then update
    const result = await Content.findOneAndUpdate(
      { _id: contentId },
      { $set: { acronym, definition } },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Content not found!' });

    return res.json(result);
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid content id' });

    return res.status(500).json({ message: err.message });
  }
}

export default {
  newContent,
  getAllContent,
  getContentByID,
  deleteContent,
  updateContent,
};