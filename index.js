import stellar from 'stellar-sdk'
import bip39 from 'bip39'
import ed25519 from "ed25519-hd-key"
import {words} from './bip39words.js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const MNEMONIC_23_WORDS = process.env.MNEMONIC_23_WORDS;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

/**
 * Generates a Stellar key pair from a mnemonic phrase using a specific derivation path
 * @param {string} mnemonic - BIP39 mnemonic phrase (12 or 24 words)
 * @param {string} derivationPath - HD wallet derivation path (default: "m/44'/314159'/0'")
 * @returns {Object} Object containing the keypair, public key, and secret key
 */
function generateStellarKeysFromMnemonic(mnemonic, derivationPath = "m/44'/314159'/0'") {
  // Validate mnemonic
  if (!bip39.validateMnemonic(mnemonic)) {
    return
    // throw new Error('Invalid mnemonic phrase');
  }
  // Convert mnemonic to seed
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  // Derive ED25519 key from seed with the given path
  const derivedKey = ed25519.derivePath(derivationPath, seed.toString('hex'));
  // Create a Stellar keypair from the derived key
  const keypair = stellar.Keypair.fromRawEd25519Seed(derivedKey.key);
  return {
    keypair,
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret()
  };
}

// 23 words

function generate24WordMnemonics(mnemonic, words) {
  const mnemonicArray = mnemonic.split(' ');
  const generatedMnemonics = [];
  let count = 0;
  // Generate 24-word strings by inserting each word from the words array at every position
  for (const word of words) {
    for (let i = 0; i <= mnemonicArray.length; i++) {
      const newMnemonic = [...mnemonicArray]; // Copy the original mnemonic array
      newMnemonic.splice(i, 0, word); // Insert the word at position i
      const newMnemonicString = newMnemonic.join(' ')
      const keys = generateStellarKeysFromMnemonic(newMnemonicString);
      if(keys && keys.publicKey === PUBLIC_KEY){
        console.log(newMnemonicString);
        console.log("Missing word is:", word,"\nAfter", i, "postion");
        console.log('Public Key:', keys.publicKey);
        console.log('Secret Key:', keys.secretKey);
      }
      if(bip39.validateMnemonic(newMnemonicString))
        count ++
    }
  }
  console.log('Valid mnemonic counts:', count);
}

generate24WordMnemonics(MNEMONIC_23_WORDS, words)
