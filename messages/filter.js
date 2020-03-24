module.exports = {
    "command": "filter sources from a package.xml file for convert or deploy",
    "packageFlagDescription": "package.xml file path to filter source with",
    "successProcess": `sources successfully filtered and ready.
    * convert   => sfdx force:source:convert -x %s -d <output>
    * deploy    => sfdx force:source:deploy -x %s ...<options>`
};
