# Output formatting
TITLE = @echo '[+]'
ifndef VERBOSE
	Q = @
else
	Q = @echo '  '
endif

all: firefox chrome

firefox:
	$(TITLE) 'Building firefox'
	$(Q)mkdir -p build/firefox
	$(Q)cp -r src/firefox/* build/firefox
	$(Q)cp src/walkhub/logo.png build/firefox/data
	$(Q)cp src/chrome/popup.* build/firefox/data
	$(Q)curl "http://code.jquery.com/jquery-1.11.0.min.js" > build/firefox/data/jquery.js

chrome:
	$(TITLE) Building chrome
	$(Q)mkdir -p build/chrome
	$(Q)cp src/chrome/manifest.json build/chrome
	$(Q)cp src/chrome/popup.* build/chrome
	$(Q)cp src/chrome/walkhub_loader.js build/chrome
	$(Q)cp src/walkhub/player/player.js build/chrome
	$(Q)cp src/walkhub/logo.png build/chrome
	$(Q)curl "http://code.jquery.com/jquery-1.11.0.min.js" > build/chrome/jquery.js

clean:
	$(TITLE) Cleaning up
	$(Q)rm -rf ./build/chrome
	$(Q)rm -rf ./build/firefox
