const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing, isAdmin} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index))
.post(isAdmin, validateListing, upload.array('listing[images]', 10), wrapAsync(listingController.createListing));

//New Route - Admin Only
router.get("/new", isAdmin, listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isAdmin, upload.array('listing[images]', 10), validateListing, wrapAsync(listingController.updateListing))
.delete(isAdmin, wrapAsync(listingController.destroyListing));



//Edit Route - Admin Only
router.get("/:id/edit", isAdmin, wrapAsync(listingController.renderEditForm));


module.exports = router; 