# Output formatting
TITLE = @echo '[+]'
ifndef VERBOSE
	Q = @
else
	Q = @echo '  '
endif

JQUERY_CACHE='.jquery.cached'

all: firefox chrome

firefox: download_jquery
	$(TITLE) 'Building firefox'
	$(Q)mkdir -p build/firefox
	$(Q)cp -r src/firefox/* build/firefox
	$(Q)cp src/walkhub/logo.png build/firefox/data
	$(Q)cp src/walkhub/popup.* build/firefox/data
	$(Q)cp ${JQUERY_CACHE} build/firefox/jquery.js
	$(Q)cp src/chrome/walkhub_loader.js build/firefox/data

chrome: download_jquery
	$(TITLE) Building chrome
	$(Q)mkdir -p build/chrome
	$(Q)cp src/chrome/manifest.json build/chrome
	$(Q)cp src/chrome/walkhub_loader.js build/chrome
	$(Q)cp src/walkhub/popup.* build/chrome
	$(Q)cp src/walkhub/player/player.js build/chrome
	$(Q)cp src/walkhub/logo.png build/chrome
	$(Q)cp ${JQUERY_CACHE} build/chrome/jquery.js

clean:
	$(TITLE) Cleaning up
	$(Q)rm -rf ./build/chrome
	$(Q)rm -rf ./build/firefox
	$(Q)rm ${JQUERY_CACHE}

download_jquery:
	$(Q)curl -s "http://code.jquery.com/jquery-1.11.0.min.js" > ${JQUERY_CACHE}
