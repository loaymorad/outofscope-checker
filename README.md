# outofscope-checker

**outofscope-checker** is a Firefox extension developed by me (**Loay Morad**) to assist bug bounty hunters in identifying and avoiding out-of-scope subdomains or domains while hunting. This tool ensures that you stay within the authorized scope during your security testing.

## Features
- Helps bug bounty hunters avoid testing out-of-scope subdomains/domains.
- Real-time detection when browsing potentially out-of-scope links.

## Installation Instructions

Follow these steps to install the extension in Firefox:

1. **Download and unzip** the extension files.
2. Open Firefox and navigate to `about:debugging`.
3. Select **"This Firefox"** from the sidebar.
4. Click on **"Load Temporary Add-on"**.
5. In the file dialog, choose the `manifest.json` file from the unzipped folder.
6. Once the extension is loaded, you can **pin the tool** to your browser toolbar for easy access.

## Usage Instructions

1. **Activate the extension** by clicking on the extension icon in the Firefox toolbar.
2. **Enter out-of-scope subdomains**. You can input:
   - A wildcard domain (e.g., `*.example.com`) to exclude all subdomains of a domain.
   - A specific subdomain (e.g., `sub.example.com`) to exclude only that particular subdomain.
3. After entering the domains/subdomains, click **Save** to store your settings.
4. **Start browsing**. If the extension detects that you're visiting an out-of-scope domain or subdomain, the icon will change to **red**. This serves as a visual cue that you're on an out-of-scope URL.

## Example

- To exclude all subdomains of `example.com`, enter:
  ```
  *.example.com
  ```
- To exclude a specific subdomain like `sub.example.com`, enter:
  ```
  sub.example.com
  ```


