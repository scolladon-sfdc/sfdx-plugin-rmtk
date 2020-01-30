module.exports = {
    "command": "prepare sources from a package.xml file for convert or deploy",
    "packageFlagDescription": "package.xml file path to prepare source with",
    "successProcess": `sources successfully filtered and ready.
    * convert   => sfdx force:source:convert -x %s -d <output>
    * deploy    => sfdx force:source:deploy -x %s ...<options>`
};
