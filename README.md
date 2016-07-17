# zappeur
A visual guide for foreign, streamable TV channels

Gathers XML data about what's on the BBC, ITV, Channel 4, etc, and then puts it in a scrollable tv guide format similar to the one used by the BBC's iPlayer guide (http://www.bbc.co.uk/iplayer/guide). Useful if you happen to be the type of blackguard who would use a proxy to stream foreign television and want to know when Match of the Day or Great British Bakeoff are going to be on (who, me? Never!)

Originally written as a front-end project for RefactorU; subsequently, as I learned about how the backend works, I made a backend for it. The biggest lesson learned: Don't make a frontend for a website when you have no idea how servers and databases work. There was a lot of refactoring necessary to hook the front end up to the backend. That refactoring was made more difficult by the unnecessary complexity of the code: I hadn't sat down beforehand and had a good think about what I needed the different controllers and factories, etc. to do, so there's a few code smells in there and things aren't being done efficiently.

Of course, looking back at the code, it doesn't look nearly as awful as I remember it being; maybe I'm just being too hard on myself.
