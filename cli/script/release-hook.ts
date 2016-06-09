import * as crypto from "crypto";
import * as fs from "fs";
var hashFiles = require("hash-files");
import * as jwt from "jsonwebtoken";
import * as path from "path";
import * as q from "q";

import * as packageDiffingUtils from "./package-diffing";

interface ReleaseHookParams {
    appName: string;
    deploymentName: string;
    appStoreVersion: string;
    filePath: string;
}

export function execute(params: ReleaseHookParams): q.Promise<void> {
    return sign(params);
}

var CURRENT_SIGNATURE_VERSION: string = "1.0.0";
var HASH_ALGORITHM: string = "sha256";
var PRIVATE_KEY_PATH: string;

interface CodeSigningClaims {
    version: string;
    // deploymentKey: string;
    // appStoreVersion: string;
    contentHash: string;
}

interface SignedMetadata extends CodeSigningClaims {
    signature: string;
}

function sign(params: ReleaseHookParams): q.Promise<void> {
    // If signature file already exists, throw error
    if (!fs.lstatSync(params.filePath).isDirectory()) {
        // TODO: Make it a directory
    }

    return q.nfcall<string>(hashFiles, {
        algorithm: HASH_ALGORITHM,
        files: [ path.join(params.filePath, "**") ]
    })
        .then((hash: string) => {
            var claims: CodeSigningClaims = {
                version: CURRENT_SIGNATURE_VERSION,
                contentHash: hash
            };

            return q.nfcall<string>(jwt.sign, claims, PRIVATE_KEY_PATH, { algorithm: "RS256" });
        })
        .then((signedJwt: string) => {

        })

    // Sign [deploymentKey, appVersion, contents, order(?)]
    return packageDiffingUtils.generatePackageManifest(filePath)
            .then((manifest?: Map<string, string>): Promise<string> => {
                if (manifest) {
                    // If update is a zip, generate a packageHash using the manifest, since
                    // that more accurately represents the contents of each file in the zip.
                    return packageDiffingUtils.generatePackageHashFromManifest(manifest);
                } else {
                    // Update is not a zip (flat file), generate the packageHash over the
                    // entire file contents.
                    return packageDiffingUtils.generatePackageHashFromFile(filePath);
                }
            })
            .then(() => {})
}