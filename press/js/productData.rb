# frozen_string_literal: true
# typed: strict

require_relative '../../init_autoloader'

module Opus::Press
  PRODUCT_DATA = T.let(
    [
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "Where is My Flying Car?",
        summary: "While Silicon Valley is synonymous with software, its beginnings were driven by a need for a better class of hardware. Michael S. Malone’s _The Big Score_ is a panoramic history of Silicon Valley’s founding days—written as they were still playing out in 1985. One of the first reporters on the tech industry beat, Malone recounts the feverish efforts of technologists and entrepreneurs to build something that would change the world. Starting with the birth of the semiconductor in the 1930s, he illustrates how decades of technological innovation laid the foundation for the meteoric rise of the Valley in the 1970s. Malone punctuates this history with profiles of tech’s early builders, capturing the high-agency spirit that shaped the electronics revolution. A decades-long story with individual sacrifice and ingenuity at its core, _The Big Score_ recounts the history of today's most dynamic sector through its upstart beginnings.",
        description: "Back in the 60s we were all sure there would be flying cars in our future. Were the futurists and SF writers of the day just wrong? Or has something more interesting and important happened?",
        price: 23,
        buyPath: "https://www.amazon.com/dp/1953953166",
        praises: [
          Praise.new( 
            name: "Jeff Skoll", 
            role: "first president of eBay", 
            quote: "Mike Malone’s epic depiction of Silicon Valley was a calling card for me and countless other young entrepreneurs with a background in tech. Malone’s stories captured the essence of Valley culture and the many outsize personalities who helped create this mecca of tech. Years later, this book is still relevant, and offers insights into the Valley and its ongoing place in the world.",
          ),
          Praise.new( 
            name: "Sandy Kurtzig", 
            role: "Founder, CEO, and chairman of ASK Group", 
            quote: "Mike Malone is the gold standard for telling Silicon Valley’s history. He has witnessed the evolution of the Valley from fruit groves to office parks, and has catalogued the world’s dependency on the Valley’s innovative technology. Experience the growth of Silicon Valley through the eyes of a pioneer, friend, reporter, and mentor to so many of us early Valley entrepreneurs.",
          ),
          Praise.new( 
            name: "John Hennessy", 
            role: "President emeritus of Stanford University and chairman, Alphabet Inc.", 
            quote: "From the Valley’s deep roots in the semiconductor industry to the rise of startups and venture capital, and the emergence of new models of management, _The Big Score_ documents the beginnings of a technological transformation. When the book was first published, the microprocessor was kick-starting the computer industry. Today, our greatest innovators continue to build on the work of these early pioneers.",
          ),
        ],
        author: Author.new(
          name: "J. Storrs Hall",
          intro: "has covered Silicon Valley and tech for over 30 years.",
          bio: "His articles and editorials have appeared in the _San Jose Mercury-News_, _Wall Street Journal_, _Economist_, _Fortune_, and _New York Times_. He has written or co-authored more than 25 award-winning books, including _Bill and Dave_ and _The Intel Trinity_, and co-produced The New Heroes, an Emmy-nominated miniseries on social entrepreneurs. He lives in Palo Alto, California.",
        ),
        palette: BookPalette.new(
          backgroundColor: "#3d3d3d",
          color: "#4bc3e0",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "the-big-score",
        productType: Opus::Press::ProductType::Book,
        title: "The Big Score",
        summary: "While Silicon Valley is synonymous with software, its beginnings were driven by a need for a better class of hardware. Michael S. Malone’s _The Big Score_ is a panoramic history of Silicon Valley’s founding days—written as they were still playing out in 1985. One of the first reporters on the tech industry beat, Malone recounts the feverish efforts of technologists and entrepreneurs to build something that would change the world. Starting with the birth of the semiconductor in the 1930s, he illustrates how decades of technological innovation laid the foundation for the meteoric rise of the Valley in the 1970s. Malone punctuates this history with profiles of tech’s early builders, capturing the high-agency spirit that shaped the electronics revolution. A decades-long story with individual sacrifice and ingenuity at its core, _The Big Score_ recounts the history of today’s most dynamic sector through its upstart beginnings.",
        description: "A panoramic history of Silicon Valley, from the birth of the semiconductor to the rise of the personal computer.",
        price: 23,
        buyPath: "https://www.amazon.com/dp/1953953166",
        zine: Zine.new(
          cover: "covers/TBS_zine.png",
          pdf: "https://assets.ctfassets.net/fzn2n1nzq965/3gAko69pEeJOYnOPNGQ4Az/9e762faf9ae6767362892b1a4abac165/St-Bob_Zine.pdf"
        ),
        praises: [
          Praise.new( 
            name: "Jeff Skoll", 
            role: "first president of eBay", 
            quote: "Mike Malone’s epic depiction of Silicon Valley was a calling card for me and countless other young entrepreneurs with a background in tech. Malone’s stories captured the essence of Valley culture and the many outsize personalities who helped create this mecca of tech. Years later, this book is still relevant, and offers insights into the Valley and its ongoing place in the world.",
          ),
          Praise.new( 
            name: "Sandy Kurtzig", 
            role: "Founder, CEO, and chairman of ASK Group", 
            quote: "Mike Malone is the gold standard for telling Silicon Valley’s history. He has witnessed the evolution of the Valley from fruit groves to office parks, and has catalogued the world’s dependency on the Valley’s innovative technology. Experience the growth of Silicon Valley through the eyes of a pioneer, friend, reporter, and mentor to so many of us early Valley entrepreneurs.",
          ),
          Praise.new( 
            name: "John Hennessy", 
            role: "President emeritus of Stanford University and chairman, Alphabet Inc.", 
            quote: "From the Valley’s deep roots in the semiconductor industry to the rise of startups and venture capital, and the emergence of new models of management, _The Big Score_ documents the beginnings of a technological transformation. When the book was first published, the microprocessor was kick-starting the computer industry. Today, our greatest innovators continue to build on the work of these early pioneers.",
          ),
        ],
        author: Author.new(
          name: "Michael S. Malone",
          intro: "has covered Silicon Valley and tech for over 30 years.",
          bio: "His articles and editorials have appeared in the _San Jose Mercury-News_, _Wall Street Journal_, _Economist_, _Fortune_, and _New York Times_. He has written or co-authored more than 25 award-winning books, including _Bill and Dave_ and _The Intel Trinity_, and co-produced The New Heroes, an Emmy-nominated miniseries on social entrepreneurs. He lives in Palo Alto, California.",

        ),
        palette: BookPalette.new(
          backgroundColor: "#482b23",
          color: "#e94718",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "Scientific Freedom: The Elixir of Civilization",
        shortTitle: "Scientific Freedom",
        summary: "So rich was the scientific harvest of the early 20th century that it transformed entire industries and economies. Max Planck laid the foundation for quantum physics, Barbara McClintock for modern genetics, Linus Pauling for chemistry—the list goes on. But in the 1970s, the nature and pace of scientific discovery began to stagnate due to a combination of peer review, mandated justification of spending, and the push for short-term miracles. In _Scientific Freedom_, first published in 2008, Donald W. Braben presents a framework to find and support transformative scientific innovation. Even in the earliest stages, groundbreaking research can look unrecognizable to those who are accustomed to the patterns established by the past. As Braben argues, support for this research requires rethinking the processes used to discover and sponsor scientists with revolutionary ideas—and then giving them the freedom to explore.",
        description: "A revolutionary and timely framework to find and support scientific innovation.",
        price: 23,
        buyPath: "https://www.amazon.com/dp/0578675919/",
        praises: [
          Praise.new( 
            name: "Dudley Herschbach", 
            role: "Nobel Prize in Chemistry 1986", 
            quote: "A superb book, both inspiring and provocative. Braben strives to ensure that the most creative scientists, if completely free to pursue unorthodox research, will aim to attain the ‘elixir of civilization.’",
          ),
          Praise.new( 
            name: "Sir Richard J. Roberts", 
            role: "Nobel Prize in Physiology or Medicine 1993", 
            quote: "All scientists, granting agencies, and policymakers should read this refreshing book and respond to the need to change current funding paradigms.",
          ),
          Praise.new( 
            name: "Sir Martyn Poliakoff", 
            role: "University of Nottingham, Michael Faraday Prize 2019", 
            quote: "Braben has long held visionary views of how to fund the most innovative and creative science. It cannot be denied that, with the right financial support, his approach can be made to work spectacularly.",
          ),
        ],
        reviews: [
          Praise.new( 
            name: "Ben Reinhardt",
            url: "https://twitter.com/Ben_Reinhardt/status/1326707903714226176",
            quote: "A sobering (but hopeful!) exploration of the stagnation in what I would call ‘paradigm shifting research’ and what to do about it.",
          ),
          Praise.new( 
            name: "Quarterly Review of Biology",
            url: "https://www.journals.uchicago.edu/doi/10.1086/592853", 
            quote: "Braben does an excellent job of highlighting the need to reassess the selection criteria used to decide what scientific projects receive funding.",
          ),
        ],
        author: Author.new(
          name: "Donald W. Braben",
          intro: "is a scientist and author.",
          bio: "Donald W. Braben is a scientist and author. From 1980 to 1990, he led British Petroleum’s Venture Research program, for which he developed a radical, low-cost approach to finding and funding researchers whose work might redefine their fields. He currently holds an honorary position at University College London.",
        ),
        palette: BookPalette.new(
          backgroundColor: "#3d3d3d",
          color: "#fd2234",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "Working in Public: The Making and Maintenance of Open Source Software",
        shortTitle: "Working in Public",
        summary: "Over the last 20 years, open source software has undergone a significant shift––from providing an optimistic model for public collaboration to undergoing constant maintenance by the often unseen solo operators who write and publish the code that millions of users rely on every day. In _Working in Public_, Nadia Eghbal takes an inside look at modern open source software development, its evolution over the last two decades, and its ramifications for an internet reorienting itself around individual creators. By delineating the structure of open source projects, she explores, for the first time, the maintenance costs of production that software incurs for its developers. Drawing on hundreds of developer interviews and analyses of platforms like Twitter, Facebook, Instagram, Twitch, and YouTube, Eghbal argues that examining _who_ produces things on the internet, and not just what they produce, helps us understand the value of online content today.",
        description: "An inside look at modern open source software developers—and their influence on our online world.",
        price: 18.05,
        buyPath: "https://www.amazon.com/dp/0578675862/",
        praises: [
          Praise.new( 
            name: "Nat Friedman", 
            role: "CEO of GitHub", 
            quote: "Nadia writes from a unique perspective at the intersection of open source, economics, and poetry. This is the definitive book on the dynamics of online creative communities.",
          ),
          Praise.new( 
            name: "Devon Zuegel", 
            role: "former director of product for communities at GitHub", 
            quote: "Nadia is one of today’s most nuanced thinkers about the depth and potential of online communities. This book could not have come at a better time, as the ways we relate to each other have become more sharply mediated by the internet.",
          ),
          Praise.new( 
            name: "Henry Zhu", 
            role: "maintainer of Babel", 
            quote: "In the age of information abundance, we’re all maintainers now. Working in Public is an anthropological dive into the stories of real developers, providing us a way to ask new questions through the lens of open source. Nadia presents us with a book that isn’t focused on just money, licenses, or code, but which is for all of us who make, as creators of all kinds.",
          ),
        ],
        reviews: [
          Praise.new( 
            name: "Wired",
            url: "https://www.wired.com/story/open-source-coders-few-tired/",
            quote: "_Working in Public_ [is] a fascinating book . . . . We need to rethink the very idea of what crowdsourcing is capable of––and understand that it is perhaps more limited than promised. The open source revolution has been carried on the backs of some very weary people.",
          ),
          Praise.new( 
            name: "Alex Danco",
            url: "https://alexdanco.com/2020/10/08/making-is-show-business-now/", 
            quote: "Eghbal clearly sees and articulates something important about the way we make things, and how that’s changing. . . ._Working in Public_ opens by challenging a common perception about open source today: the idea that it’s collaborative.",
          ),
        ],
        author: Author.new(
          name: "Nadia Eghbal",
          intro: "is a writer and researcher who explores how the internet enables individual creators.",
          bio: "From 2015 to 2019, she worked independently and at GitHub to improve the open source developer experience. She is the author of “Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure,” published by the Ford Foundation.",
          links: [
            AuthorLink.new(
              label: "Website",
              url: "https://nadiaeghbal.com/",
            ),
            AuthorLink.new(
              label: "Twitter",
              url: "https://twitter.com/nayafia",
            ),
            AuthorLink.new(
              label: "Newsletter",
              url: "http://nayafia.substack.com/",
            ),
          ],
        ),
        palette: BookPalette.new(
          backgroundColor: "#FF7E76",
          color: "#19359B",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "The Art of Doing Science and Engineering",
        summary: "What inspires a great idea? Can we train our thinking to develop world-changing understandings and insights? Richard Hamming would say yes. In _The Art of Doing Science and Engineering_, he elaborates on his seminal essay “You and Your Research,” a provocative challenge to anyone who wants to build something great, and offers a manual of style for how to get there. Playfully framed as a textbook, and rich in its recounting of influential individuals like Albert Einstein and Grace Hopper, this unorthodox memoir by the seminal mathematician and engineer encourages the reader to aspire to, learn from, and surpass the achievements of yesterday’s greatest minds. This edition includes the original 1996 compilation of Hamming’s lectures for the U.S. Naval Postgraduate School, along with a new foreword by designer and engineer Bret Victor and more than 70 redrawn graphs and charts.",
        description: "A groundbreaking treatise by one of the great mathematicians of our time, who argues that highly effective thinking can be learned.",
        price: 23,
        buyPath: "https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178/ref=sr_1_1?dchild=1&keywords=The+Art+of+Doing+Science+and+Engineering&qid=1590087581&sr=8-1",
        zine: Zine.new(
          cover: "covers/TADSE_zine.png",
          pdf: "https://d37ugbyn3rpeym.cloudfront.net/stripe-press/TAODSAE_zine_press.pdf"
        ),
        reviews: [
          Review.new( 
            name: "New Yorker, which named The Art of Doing Science and Engineering a best book of 2020",
            url: "https://www.newyorker.com/culture/2020-in-review/the-best-books-we-read-in-2020",
            quote: "He was one of the last geniuses who believed in innovation as a shared public project.",
          ),
        ],
        praises: [
          Praise.new( 
            name: "Andy Matuschak", 
            role: "software engineer, designer, and researcher", 
            quote: "Hamming is here to tell you about excellence. His lessons unfold through personal stories of discovery and failure—life as an extraordinary scientist. But Hamming demands that you do extraordinary work, too, and for that he offers the best advice I know.",
          ),
          Praise.new( 
            name: "Bret Victor", 
            role: "founder of Dynamicland", 
            quote: "Hamming was always as much a teacher as a scientist, and, having spent a lifetime forming and confirming a theory of great people, he felt he could prepare the next generation for even greater greatness. That’s the premise and promise of this book.",
          ),
          Praise.new( 
            name: "Eugene N. Miya", 
            role: "NASA researcher", 
            quote: "Your last chance to read the thinking of one of the major intellects that the U.S.A. has produced.",
          ),
        ],
        author: Author.new(
          name: "Richard W. Hamming ",
          intro: "(1915–1998) was a scientist and mathematician who discovered formulas that allow computers to correct their own errors.",
          bio: "He provided crucial programming support to the Manhattan Project, and later joined Bell Labs. In 1968, he received the Turing Award, the highest honor in computer science."
        ),
        palette: BookPalette.new(
          backgroundColor: "#303328",
          color: "#E0E19F",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "The Making of Prince of Persia: Journals 1985-1993",
        shortTitle: "The Making of Prince of Persia",
        summary: "Before _Prince of Persia_ was a bestselling video game franchise and a Disney movie, it was an Apple II computer game created and programmed by a lone developer, Jordan Mechner. Mechner’s candid and revealing journals from the time capture the journey from his parents’ basement to the forefront of the fast-growing 1980s video game industry, as a 20-year-old fresh out of college with a liberal arts degree—and the creative, technical, personal, and professional struggles that brought the Prince into the homes of millions of people worldwide. In The Making of _Prince of Persia_, on the 30th anniversary of the game’s release, Mechner looks back at the journals he kept from 1985 to 1993 and annotates them with insights into the game that established him as a pioneer of cinematic storytelling in the industry.",
        description: "An illustrated and annotated edition of the journals kept by the iconic video game’s creator offers an unvarnished look at the creative process.",
        price: 23,
        buyPath: "https://smile.amazon.com/gp/product/0578627310?pf_rd_r=HMREHVABQXQXVW97F1V0&pf_rd_p=ab873d20-a0ca-439b-ac45-cd78f07a84d8",
        reviews: [
          Review.new( 
            name: "Cory Doctorow",
            url: "https://pluralistic.net/2020/05/03/give-me-slack/#pop",
            quote: "It’s a genuinely delightful book, even if you don’t care about the history of video games. . . .  To read Mechner’s contemporaneous logs of his wrestling with his tools and machines is to take a journey back to a heroic age of games authorship.",
          ),
          Review.new( 
            name: "Applied Divinity Studies",
            url: "https://applieddivinitystudies.com/prince-of-persia/",
            quote: "The best biography I’ve ever read.",
          ),
        ],
        praises: [
          Praise.new( 
            name: "Mike Krieger", 
            role: "cofounder of Instagram", 
            quote: "_Prince of Persia_ was the first computer game I ever fell in love with. Mechner’s journey is a universal one for anyone creating something brand-new, and it brought me back to the early, crazy days of building Instagram.",
          ),
          Praise.new( 
            name: "D.B. Weiss", 
            role: "cocreator of HBO’s _Game of Thrones_", 
            quote: "Mechner’s journals are a unique record from the birth of an industry. The Making of _Prince of Persia_ is also an unvarnished window into the creative process, with all its excitement, toil, setbacks, doubts, and triumphs. A fantastic read.",
          ),
          Praise.new( 
            name: "Neil Druckmann", 
            role: "writer and director of _The Last of Us_ and _Uncharted 4_", 
            quote: "Probably my favorite book on game development.",
          ),
        ],
        author: Author.new(
          name:"Jordan Mechner",
          intro: "is a game designer, screenwriter, and author. ",
          bio: "His other books include the sketchbook journal _Year 2 in France_ and the Eisner Award-nominated graphic novel _Templar_, a _New York Times_ bestseller illustrated by LeUyen Pham and Alex Puvilland.",
          links: [
            AuthorLink.new(
              label: "Website",
              url: "https://jordanmechner.com/",
            ),
            AuthorLink.new(
              label: "Twitter",
              url: "https://twitter.com/jmechner",
            ),
          ]
        ),
        palette: BookPalette.new(
          backgroundColor: "#2F35C8",
          color: "#EF9E40",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "Get Together: How to Build a Community With Your People",
        shortTitle: "Get Together",
        summary: "Although communities feel magical, they don’t come together by magic. Whether starting a run crew, connecting with fans online, or sparking a movement of K-12 teachers, the secret to getting people together is to build your community _with_ people, not for them. In _Get Together_, the founders of the community strategy agency People & Company—Bailey Richardson, Kevin Huynh, and Kai Elmer Sotto—provide a practical and heartfelt guide to create thriving communities, both in person and online. The authors break down into clear steps the challenges of getting passionate people together, help individuals and organizations navigate the intricacies of leading a community, and share true stories of everyday people who have created vibrant communities. _Get Together_ shows that if we join forces—as company and customers, artist and fans, organizer and advocates—we’ll do more together than we ever could alone.",
        description: "A practical and heartfelt guide to cultivating a community: people who come together over shared passions.",
        price: 23,
        buyPath: "https://www.amazon.com/Get-Together-Build-Community-People/dp/1732265194/ref=sr_1_6?keywords=get+together+bailey+richardson&qid=1562594471&s=gateway&sr=8-6",
        video: Video.new(
          url: "https://www.youtube.com/watch?v=fLky6QynDt4&list=PLcoWp8pBTM3C9yb6Bgi3_vWrio2QX7Df0&index=6",
          poster: "videos/GT_poster.jpg",
          title: "Conversation with People & Co.",
        ),
        author: Author.new(
          name: "Bailey Richardson, Kevin Huynh, and Kai Elmer Sotto",
          intro: "comprise People & Company, an agency that helps organizations build communities.",
          bio: "They’ve helped communities of investors, entrepreneurs, teachers, caregivers, dog walkers, runners, surfers, and more.",
          links: [
            AuthorLink.new(
              label: "Podcast",
              url: "https://itunes.apple.com/us/podcast/the-get-together/id1447445682",
            ),
            AuthorLink.new(
              label: "Website",
              url: "https://www.people-and.com/",
            ),
            AuthorLink.new(
              label: "Twitter",
              url: "https://twitter.com/people_and_co",
            ),
          ]
        ),    
        praises: [
          Praise.new( 
            name: "Alisha Ramos", 
            role: "founder of Girls’ Night In", 
            quote: "I highly recommend _Get Together_ for anyone who’s looking to crack the code on building a community.",
          ),
          Praise.new( 
            name: "Dave Isay", 
            role: "founder of StoryCorps", 
            quote: "_Get Together_ is a generous, practical, and heartfelt guide to creating community in the digital age. With no jargon and no nonsense, Bailey, Kevin, and Kai lay out simple steps for helping people come together in meaningful and powerful ways.",
          ),
          Praise.new( 
            name: "Jocelyn Wyatt", 
            role: "CEO of IDEO.org", 
            quote: "As a leader of a social-impact organization, I found _Get Together_ to be helpful in thinking about how we could do better at building and cultivating the community around IDEO.org. I’d recommend _Get Together_ to anyone organizing or participating in communities, personally or professionally",
          ),
        ],
        palette: BookPalette.new(
          backgroundColor: "#FF825A",
          color: "#452121",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "An Elegant Puzzle: Systems of Engineering Management",
        shortTitle: "An Elegant Puzzle",
        summary: "While management is foundational to any organization, engineering management in particular presents its own set of challenges—especially in high-growth environments. How and when should your engineers pay down technical debt? How do you tackle a seemingly endless stream of migrations? How do you ensure that each engineer on your team is growing at the right pace? Will Larson’s _An Elegant Puzzle_ explores the specific challenges of engineering management—from sizing teams to handling technical debt to developing succession planning—and provides a guide to solving complex managerial problems. Drawing on his experience at Digg, Uber, and Stripe, Larson presents a thoughtful approach to engineering management that balances structured principles with human-centric thinking. A useful primer for engineering leaders of all levels at companies of all sizes, _An Elegant Puzzle_ lays out a road map for building organizations where engineers can thrive.",
        description: "A guide to engineering management that helps leaders create organizations where engineers can thrive.",
        price: 22,
        buyPath: "https://www.amazon.com/dp/1732265186",
        reviews: [
          Review.new( 
            name: "Gergely Orosz",
            url: "https://blog.pragmaticengineer.com/an-elegant-puzzle-book-review/",
            quote: "_An Elegant Puzzle_ is to date the most hands-on perspective on engineering management within a high-growth, tech-first organization, that I have read. . . . [It] is not just for engineering managers: product managers and engineers working at high-growth companies will find it a good read.",
          ),
          Review.new( 
            name: "Software Engineering Daily",
            url: "https://softwareengineeringdaily.com/2019/06/14/elegant-puzzle-with-will-larson/",
            quote: "Larson captures the timeless spirit of creative problem-solving that draws us to software engineering while also providing concrete strategies for modern organizations.",
          ),
        ],
        praises: [
          Praise.new( 
            name: "Cindy Sridharan", 
            role: "distributed systems engineer and author of _Distributed Systems Observability_", 
            quote: "_An Elegant Puzzle_ is a masterful study of the challenges and demands of the discipline of engineering management, viewed through the prism of systems thinking. Readers can expect an actionable template for addressing complex problems with finesse, creativity, and fairness.",
          ),
          Praise.new( 
            name: "Jeffrey Meyerson", 
            role: "host of the _Software Engineering Daily_ podcast", 
            quote: "Software engineering is evolving faster than ever before. In An Elegant Puzzle, Will Larson captures the timeless spirit of creative problem-solving that draws us to software engineering, while also providing concrete strategies for modern organizations.",
          ),
          Praise.new( 
            name: "Oren Ellenbogen", 
            role: "VP of engineering at Forter", 
            quote: "Engineering managers can often feel like they are struggling to keep their heads above the water. Our technical training is missing the frameworks and tools needed to build healthy and productive teams. The insights and step-by-step approach covered in _An Elegant Puzzle_ will become your favorite go-to resource.",
          ),
        ],
        author: Author.new(
          name: "Will Larson",
          intro: "has been an engineering leader and software engineer ",
          bio: "Will Larson has been an engineering leader at technology companies including Yahoo, Digg, Uber, Stripe, and Calm. _An Elegant Puzzle_ draws from writing on his blog, _(https://lethain.com/)[Irrational Exuberance]_. He is also the author of the book _(https://lethain.com/staff-engineer/)[Staff Engineer]]_.",
          links: [
            AuthorLink.new(
              label: "Twitter",
              url: "https://twitter.com/Lethain",
            ),
            AuthorLink.new(
              label: "Website",
              url: "https://lethain.com/",
            ),
          ],
        ),
        palette: BookPalette.new(
          backgroundColor: "#2F2F2F",
          color: "#ffffff",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "The Revolt of the Public and the Crisis of Authority in the New Millennium",
        shortTitle: "The Revolt of the Public",
        summary: "When it comes to the flow of information, technology has categorically reversed the balance of power between the public and the elites who manage the great hierarchical institutions of the industrial age––government, political parties, and the media. In _The Revolt of the Public_, Martin Gurri tells the story of how insurgencies, enabled by digital devices and a vast information sphere, have mobilized millions of ordinary people around the world. Originally published in 2014, _The Revolt of the Public_ now appears in an updated edition, which includes an extensive analysis of Donald Trump’s improbable rise to the presidency and the electoral triumphs of Brexit. Gurri concludes with a look forward, considering whether the current elite class can bring about a reformation of the democratic process, and whether new organizing principles, adapted to a digital world, can arise out of the present political turbulence.",
        description: "An account of how insurgencies, enabled by digital devices and a vast information sphere, have mobilized millions of ordinary people around the world and transformed how they view the elites.",
        price: 20,
        buyPath: "https://www.amazon.com/Revolt-Public-Crisis-Authority-Millennium/dp/1732265143/ref=sr_1_1?ie=UTF8&qid=1541823320&sr=8-1&keywords=revolt+of+the+public",
        reviews: [
          Review.new( 
            name: "Vox",
            url: "https://www.vox.com/future-perfect/22301496/martin-gurri-the-revolt-of-the-public-global-democracy",
            quote: "“The internet has been a marvelous invention in lots of ways, but it has also unleashed a tsunami of misinformation and destabilized political systems across the globe. Martin Gurri . . . was way ahead of the curve on this problem.",
          ),
          Review.new( 
            name: "New York Times",
            url: "https://www.nytimes.com/2021/01/28/technology/gamestop-stock.html", 
            quote: "Mr. Gurri writes that the internet has empowered ordinary citizens by giving them new information and tools, which they then use to discover the flaws in the systems and institutions that govern their lives.",
          ),
        ],
        praises: [
          Praise.new( 
            name: "Marc Andreessen", 
            role: "cofounder of Andreessen Horowitz", 
            quote: "All over the world, elite institutions, from governments to media to academia, are losing their authority and monopoly control of information to the broader public. This book has been my No. 1 handout to anyone seeking to understand this unfolding shift in power from hierarchies to networks in the age of the internet.",
          ),
          Praise.new( 
            name: "Arnold Kling", 
            role: "economist and writer",
            quote: "Martin Gurri saw it coming. When, without fanfare, he self-published the first edition in June of 2014, he did not specifically name Donald Trump or Brexit. But he saw how the internet in general and social media in particular were transforming the political landscape.",
          ),
          Praise.new( 
            name: "Roger Berkowitz", 
            role: "founder of the Hannah Arendt Center and professor of politics and human rights at Bard College", 
            quote: "We are in an open war between publics with passionate and untutored interests and elites who believe they have the right to guide those publics. Gurri asks the essential question: Can liberal representative democracy survive the rise of the publics?",
          ),
        ],
        author: Author.new(
          name: "Martin Gurri",
          intro: "is a geopolitical analyst who specializes in the relationship between politics and global media.",
          bio: "He spent 28 years analyzing open media at the CIA. _The Revolt of the Public_ draws from writing on his blog, _(https://thefifthwave.wordpress.com)[The Fifth Wave]_.",
        ),
        video: Video.new(
          url: "https://www.youtube.com/watch?v=2LWn2XAStVg&list=PLcoWp8pBTM3C9yb6Bgi3_vWrio2QX7Df0&index=4",
          poster: "videos/ROTP_poster.jpg",
          title: "Conversation with Martin Gurri",
        ),
        palette: BookPalette.new(
          backgroundColor: "#201e8e",
          color: "#f260ff",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "Stubborn Attachments: A Vision for a Society of Free, Prosperous, and Responsible Individuals",
        shortTitle: "Stubborn Attachments",
        summary: "Throughout history, economic growth has alleviated human misery, improved human happiness and opportunity, expanded political rights, and lengthened human lives. If we want to prolong growth trends and the overwhelmingly positive outcomes for societies that come with them, every individual must become more concerned with the welfare of those around us. So how do we enable such altruism? In _Stubborn Attachments_—a culmination of 20 years of philosophical and economic thinking and research––Tyler Cowen argues that reason and common sense can help free us of the faulty ideas that hold us back as people and as a society, allowing us to set our sights on the long-term struggles that maximize sustainable economic growth while respecting human rights. At its heart, _Stubborn Attachments_ makes the contemporary moral case for economic growth and delivers a dose of inspiration and optimism about the future.",
        description: "The contemporary moral case for economic growth, and a road map for forward-looking, ambitious, and altruistic thinking, by the seminal economist.",
        price: 17,
        buyPath: "https://www.amazon.com/Stubborn-Attachments-Prosperous-Responsible-Individuals/dp/1732265135/ref=sr_1_1?s=books&ie=UTF8&qid=1534253238&sr=1-1&keywords=stubborn+attachments",
        reviews: [
          Review.new( 
            name: "New Yorker",
            url: "https://www.newyorker.com/culture/annals-of-inquiry/being-in-time",
            quote: "The thing about economic growth, Cowen tells us, is that it has the potential to advance just about everything that people value. . . . There is considerable evidence supporting the commonsense view that citizens of rich countries are happier than citizens of poor countries, and that, within rich countries, wealthier individuals are happier than poorer ones.",
          ),
          Review.new( 
            name: "Noah Smith",
            url: "http://noahpinionblog.blogspot.com/2019/01/book-review-stubborn-attachments-by.html", 
            quote: "_Stubborn Attachments_ is a philosophy book. . . . [Tyler] doesn’t try to set out an absolute, formalistic, fully internally consistent system of ethical principles––instead, he embraces an eclectic, often conflicting set of principles. This is refreshing, since rigid systems always prove fragile to intuitive counterexamples.",
          ),
          Review.new( 
            name: "Los Angeles Review of Books",
            url: "https://blog.lareviewofbooks.org/reviews/human-rights-case-economic-growth-tyler-cowens-stubborn-attachments/", 
            quote: "_Stubborn Attachments_ presents a compelling case for redefining our long-term priorities in favor of more sustained economic growth and a greater respect for human rights.",
          ),
        ],
        praises: [
          Praise.new( 
            name: "Cardiff Garcia", 
            role: "cohost of the NPR podcast _The Indicator from Planet Money_", 
            quote: "Most of Tyler’s books will change how you see the world in a myriad of small ways. _Stubborn Attachments_ might well change the way you see the world in one very big way. Whether you agree or disagree with Tyler’s argument, I think you’ll find that following the logic in _Stubborn Attachments_ is as fun as it is intellectually provocative.",
          ),
          Praise.new( 
            name: "Cass R. Sunstein", 
            role: "Robert Walmsley University Professor at Harvard and bestselling author of _Nudge_", 
            quote: "Tyler Cowen is a national treasure, and _Stubborn Attachments_ is brimming with deep insights–about the immense importance of economic growth, moral obligations, rights, and how to think about the future. It’s a book for right now, and a book for all times. A magnificent achievement.",
          ),
          Praise.new( 
            name: "Tim Harford", 
            role: "author of _The Undercover Economist_", 
            quote: "Tyler Cowen is one of the most intriguing and eclectic thinkers on the planet—like many people, I read something by him every day. In _Stubborn Attachments_, he combines economics and philosophy in a truly important achievement. His best, most ambitious, and most personal work.",
          ),
        ],
        author: Author.new(
          name: "Tyler Cowen",
          intro: "is a professor of economics at George Mason University and director of the Mercatus Center.",
          bio: "He was named in an _Economist_ poll as one of the most influential economists of the past decade. He is the author of several books, including the _New York Times_ bestseller _The Great Stagnation_, and is an opinion columnist at Bloomberg. He also cowrites the blog _(https://marginalrevolution.com)[Marginal Revolution]_ and hosts the podcast _(https://conversationswithtyler.com)[Conversations with Tyler]_.",
          links: [
            AuthorLink.new(
              label: "Website",
              url: "https://marginalrevolution.com/",
            ),
            AuthorLink.new(
              label: "Twitter",
              url: "https://twitter.com/tylercowen",
            ),
            AuthorLink.new(
              label: "Podcast",
              url: "https://conversationswithtyler.com/",
            ),
          ],
        ),
        palette: BookPalette.new(
          backgroundColor: "#FF5C5C",
          color: "#222222",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "The Dream Machine",
        summary: "Behind every great revolution is a vision, and behind one of the greatest revolutions of our time—personal computing—is the vision of J. C. R. Licklider. He wasn’t an engineer and he didn’t start a company or write code; instead, he was a relentless visionary who saw great potential in the way individuals could interact with computers and software. At a time when computers were a short step removed from mechanical data processors, Licklider was an enthusiastic catalyst for the seminal research that ultimately led to the internet. In a simultaneously compelling personal narrative and comprehensive historical exposition, _The Dream Machine_ by M. Mitchell Waldrop tells the story of the birth of the computing revolution through the life of a man who shifted our understanding of what computers were and could be. Originally published in 2001, the book now appears in a new edition, which includes the original texts of Licklider’s three most influential writings.",
        description: "A biography of J. C. R. Licklider, the psychologist and scientist who inspired the work that led to the internet, and shifted our understanding of what computers could be.",
        price: 22,
        buyPath: "https://www.amazon.com/Dream-Machine-M-Mitchell-Waldrop/dp/1732265119/ref=sr_1_4?s=books&ie=UTF8&qid=1534249753&sr=1-4&keywords=the+dream+machine",
        reviews: [
          Praise.new( 
            name: "New York Times",
            url: "https://www.nytimes.com/2001/10/07/books/the-electric-psychologist.html#:~:text=Mitchell%20Waldrop%20has%20written%20a,punch%20cards%20to%20personal%20computers.&text=Convincing%20people%20that%20his%20crusade,his%20dream%20of%20interactive%20computing", 
            quote: "A sprawling history of the ideas, individuals, and groups of people that got us from punch cards to personal computers . . . impressive . . . compelling.",
          ),
          Praise.new( 
            name: "San Francisco Chronicle",
            quote: "_The Dream Machine_ works admirably as an exploration of the intellectual and political roots of the rise of modern computing. It’s an ambitious and worthwhile addition to the history of science.",
          ),
        ],
        praises: [
          Praise.new( 
            name: "Alan Kay", 
            role: "computer scientist", 
            quote: "When people ask me about Xerox PARC, I always tell them about J. C. R. Licklider—“Lick”—and how he started the great research funding for interactive computing and pervasive worldwide networks, which have resulted in most of the technology we use today. The top book I recommend to read about this large process, which stretched over 20 years, is _The Dream Machine_ by Mitchell Waldrop.",
          ),
          Praise.new( 
            name: "John Seely Brown", 
            role: "former director of Xerox PARC", 
            quote: "A masterpiece! A mesmerizing but balanced and comprehensive look at the making of the information revolution—the people, the ideas, the tensions, and the hurdles.",
          ),
          Praise.new( 
            name: "The New York Times Book Review", 
            role: "", 
            quote: "A sprawling history of the ideas, individuals, and groups of people that got us from punch cards to personal computers… comprehensive… impressive… [and] compelling",
          ),
        ],
        author: Author.new(
          name: "M. Mitchell Waldrop",
          intro: "earned a PhD in elementary particle physics and a master’s in journalism at the University of Wisconsin.",
          bio: "He has been a writer and editor at _Science and Nature_. He is the author of _Man-Made Minds_ (1987), a book about artificial intelligence, and _Complexity_ (1992), about the new sciences of complexity.",
          links: [
            AuthorLink.new(
              label: "Website",
              url: "https://sites.google.com/view/mmwaldrop",
            ),
          ],
        ),
        palette: BookPalette.new(
          backgroundColor: "#C7C7C7",
          color: "#222222",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
      Book.new(
        slug: "where-is-my-flying-car",
        productType: Opus::Press::ProductType::Book,
        title: "High Growth Handbook: Scaling Startups from 10 to 10,000 People",
        shortTitle: "High Growth Handbook",
        summary: "Global technology executive, serial entrepreneur, and angel investor Elad Gil has worked with high-growth tech companies like Airbnb, Twitter, Google, Stripe, and Square as they’ve scaled from small companies to global enterprises. Across all of these companies, Gil has identified a set of common patterns, and compiled them into a repeatable playbook in _High Growth Handbook_. In this definitive guide, he covers key topics for scaling startups from 10 or 20 employees to thousands, including the role of the CEO, board management, recruitment and management of executive teams, M&A, IPOs, and late-stage funding. Informed by interviews with some of the most dynamic leaders in Silicon Valley, including Reid Hoffman, Marc Andreessen, and Aaron Levie, _High Growth Handbook_ presents a road map for navigating the most complex challenges that confront leaders and operators in high-growth startups.",
        description: "The playbook for turning a startup into a unicorn, and for navigating the most complex challenges that confront leaders and operators in high-growth environments.",
        price: 20,
        buyPath: "https://www.amazon.com/High-Growth-Handbook-Elad-Gil/dp/1732265100",
        reviews: [
          Praise.new( 
            name: "Wall Street Journal",
            quote: "Many founders eventually face a moment in their company’s journey when they’ll need to scale the company and think much longer-term about success. Mr. Gil’s book walks founders through some of the steps and challenges they’ll face, such as the role of a board, mergers and acquisitions and more.",
          ),
        ],    
        praises: [
          Praise.new( 
            name: "Reid Hoffman", 
            role: "cofounder of LinkedIn", 
            quote: "Elad Gil is one of Silicon Valley’s seriously knowledgeable and battle-tested players. If you want the chance to turn your startup into the next Google or Twitter, then read this trenchant guide from someone who played key roles in the growth of these companies.",
          ),
          Praise.new( 
            name: "Aaron Levie", 
            role: "cofounder and CEO of Box", 
            quote: "Elad jam-packs every useful lesson about building and scaling companies into a single, digestible book.",
          ),
          Praise.new( 
            name: "Max Levchin", 
            role: "cofounder and CEO of Affirm, cofounder and former CTO of PayPal", 
            quote: "Armed with observations gathered while scaling some of the most successful and important companies of Silicon Valley, Elad has no-nonsense, highly applicable advice for any operator transitioning a company from the proverbial garage to the next stage, and beyond.",
          ),
        ],
        author: Author.new(
          name:"Elad Gil",
          intro: "is an entrepreneur, operating executive, and investor or advisor to private companies such as Airbnb, Coinbase, Checkr, Gusto, Instacart, Opendoor, Pinterest, Square, Stripe, Wish, and others.",
          bio: "He is cofounder and chairman at Color Genomics. _High Growth Handbook_ draws from writing on his (http://blog.eladgil.com)[blog].",
          links: [
            AuthorLink.new(
              label: "Website",
              url: "http://blog.eladgil.com/",
            ),
            AuthorLink.new(
              label: "Twitter",
              url: "https://twitter.com/eladgil",
            ),
          ],
        ),
        palette: BookPalette.new(
          backgroundColor: "#35453F",
          color: "#08BA7A",
        ),
        material: BookMaterial.new(
          shininess: 8,
          thickness: 0.8,
          diffuseMapCustom: "WIMFC_diffuse.png",
          bumpMapBase: "shared_bump_buckram.webp",
          bumpScaleBase: 0.04,
          bumpMapCustom: "WIMFC_bump.png",
          bumpScaleCustom: 0.04,
          foilMap: "WIMFC_foil.png",
          foilDetail: 1.0,
          foilSpecular: 1.0,
          foilOpacity: 0.8,
        )
      ),
    ],
  T::Array[Book]
  )
end
