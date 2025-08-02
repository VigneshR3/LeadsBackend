const ModelLeads = require("../Model/LeadsModel");
const fs = require("fs");
const path = require("path");
const NewLeads = async (req, res) => {
  try {
    console.log("📩 Incoming body:", req.body);
    console.log("📎 Uploaded file:", req.file);

    const leadData = {
      ...req.body,
      assigned: req.file ? req.file.filename : "",
    };

    const newLead = new ModelLeads(leadData);
    await newLead.save();

    console.log("✅ Saved lead:", newLead);

    return res.status(201).json({
      message: "Lead created successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("❌ Error saving lead:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
const GetAllLeads = async (req, res) => {
  try {
    const get = await ModelLeads.find();
    res.status(200).json({ success: true, message: "get all data", get: get });
  } catch (error) {
    res.status(400).json({ success: true, message: "Faild !get all data" });
  }
};

const DeleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await ModelLeads.findById(id);
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    // Delete associated image file (if exists)
    if (lead.assigned) {
      const imagePath = path.join(__dirname, "..", "uploads", lead.assigned);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn("⚠️ Image not found or already deleted:", err.message);
        } else {
          console.log("🗑️ Image file deleted:", imagePath);
        }
      });
    }

    // Delete lead from DB
    await ModelLeads.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Lead and image deleted" });
  } catch (error) {
    console.error("❌ Error deleting lead:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Server error while deleting lead" });
  }
};
const LeadsExport = async (req, res) => {
  console.log(req.body); // Assuming: req.body = [ "id1", "id2", ... ]

  const ids = req.body; // Simply use the array as-is

  try {
    const exports = await ModelLeads.find({
      _id: { $in: ids }, // Find leads with _id in the array
    });

    console.log(exports);
    res.status(200).json(exports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

module.exports = { NewLeads, GetAllLeads, DeleteOne, LeadsExport };
