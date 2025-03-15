# BIP39 Missing Word Finder

## Description

This project is designed to find a missing word from a BIP39 mnemonic code. BIP39 mnemonics are used in cryptocurrency wallets to generate deterministic keys. In some cases, a mnemonic phrase may be incomplete, missing one word. This tool brute-forces the missing word by checking all possible combinations of the 24-word mnemonic against a dictionary of 2048 BIP39 words.

## Features

- Brute-force search for a missing word in a 24-word BIP39 mnemonic.
- Utilizes a dictionary of 2048 BIP39 words for accurate word matching.
- Efficiently checks all possible combinations to find the correct mnemonic.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/piwallet-recovery.git
   cd piwallet-recovery
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the `env.example` template:
   ```bash
   cp env.example .env
   ```

4. Fill in the `.env` file with your mnemonic and public key.

## Usage

To use the BIP39 Missing Word Finder, follow these steps:

1. Ensure you have your 23-word mnemonic phrase ready, with one word missing.
   
2. Run the script to find the missing word:
   ```bash
   node index.js
   ```

3. The script will output the complete mnemonic once the missing word is found, along with the missing word's position and the corresponding public key.

### Derivation Path

This project uses the derivation path `m/44'/314159'/0'` to extract the private key and public key pair of the HD wallet from the mnemonic passphrase. This derivation path is specific to the Pi Network blockchain. The code can also be adapted for use with other blockchains that have different derivation paths.

## Example

Given the following mnemonic with a missing word:

```
loud swift dose fit act arrive behind muffin strong blast ring dumb __ project pride strategy sustain battle cushion fiction hair text benefit wood
```

The output will be:

```
loud swift dose fit act arrive behind muffin strong blast ring dumb foot project pride strategy sustain battle cushion fiction hair text benefit wood
Missing word is: foot
After 12 position
Public Key: GAIVN5LTUFJSGFOX4KVMRVYYS3GK3N65VXONH43JRB2EZWMXDAW623LC
Secret Key: SBPKWXJ4CQY2TPFSGHZBNOACEMQK6AINNMJJSCCUA5TX5QC3SBBJYWJF
Valid mnemonic counts: 209
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License