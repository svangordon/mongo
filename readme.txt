I'm changing the way that i'm sorting the data -- the basic unit is now the ChannelDay, which is the broadcasts on a single network from 6am (day) to 6am (next day). Nah, fuck that, just use a find thing

Yeah, we're using a find thing along with a query string and it works out fairly well

Okay, so what are things that we'd like to get in a query string?
	-- Network name
	-- day
	-- That's pretty much all i got
	-- The only way to improve would be to make it pull by day, but idk if that's a good idea.  seems like it would be to slow to pull from the db everytime the view scrolls (better to do day by day)

	day 1329696000
	+24 1329782400

	so + 86400 seconds

	Okay, here's what's clear to me: I'm really unsure what the optimal data structure is. Is it better to embed the shows as a sub-document of each network day?

	Oh for the cutoff, i recently changed it to 05: 59 but it probably should be 06:01.