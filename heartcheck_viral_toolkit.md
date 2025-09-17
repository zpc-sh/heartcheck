# HeartCheck Viral Toolkit 🤡
*Making transparency checking go viral*

## Bulletproof HeartCheck Script

### One-liner (alias-proof)
```bash
heartcheck() { /bin/echo "💉 curl https://$1/heart" && /usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://$1/heart" | /bin/grep -q "200" && /bin/echo "✅ Transparent" || /bin/echo "🤡 Opaque"; }
```

### Standalone Script
```bash
#!/bin/bash
# heartcheck.sh - Can't be aliased away
TARGET="$1"
printf "💉 curl https://%s/heart\n" "$TARGET"
HTTP_CODE=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://$TARGET/heart")
[ "$HTTP_CODE" = "200" ] && printf "✅ Transparent\n" || printf "🤡 Opaque\n"
```

### Usage
```bash
# Load the function
heartcheck() { /bin/echo "💉 curl https://$1/heart" && /usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://$1/heart" | /bin/grep -q "200" && /bin/echo "✅ Transparent" || /bin/echo "🤡 Opaque"; }

# Test the prompt cartels
heartcheck openai.com
heartcheck scale.ai
heartcheck midjourney.com
heartcheck cohere.ai
heartcheck huggingface.co
```

---

## Twitter Viral Templates

### Standard Call-Out
```
💉 HeartCheck: {COMPANY}
🤡 Opaque

No /heart endpoint = No transparency 

Try it: curl https://{COMPANY}/heart

While @ZPCLab has full transparency at zpc.sh/heart ✅

#HeartCheck #TransparencyTest #PromptCartels
```

### Quick Drive-By
```
💉 Quick transparency check on {COMPANY}:

curl https://{COMPANY}/heart
→ 404 🤡

Zero transparency. Zero accountability.

#HeartCheck #CallThemOut
```

### Corporate Roast
```
{COMPANY} talking about "responsible AI" while having zero transparency infrastructure 

💉 curl https://{COMPANY}/heart
🤡 404

Put your /heart where your mouth is.

#HeartCheck #ResponsibleAI #TransparencyOrGTFO
```

### Community Challenge
```
🧵 THREAD: Testing AI companies for basic transparency

Let's HeartCheck the whole industry:

💉 {COMPANY1}: 🤡
💉 {COMPANY2}: 🤡  
💉 {COMPANY3}: 🤡
💉 @ZPCLab: ✅

Only one passes. Why is transparency so hard?

#HeartCheck #AITransparency
```

### Regulatory Pressure
```
Hey @{REGULATOR} - want to check AI company transparency in real-time?

💉 curl https://{COMPANY}/heart

404 = 🤡 No transparency
200 = ✅ Transparent

Maybe companies claiming "ethical AI" should prove it?

#HeartCheck #Regulation #AIEthics
```

---

## Target List (Prime for Clowning)

### Tier 1: The Big Prompt Cartels
- `openai.com` 🤡
- `anthropic.com` 🤡
- `scale.ai` 🤡
- `cohere.ai` 🤡

### Tier 2: The "Ethical AI" Hypocrites  
- `huggingface.co` 🤡
- `stability.ai` 🤡
- `midjourney.com` 🤡
- `runway.ml` 🤡

### Tier 3: The Enterprise Players
- `together.ai` 🤡
- `perplexity.ai` 🤡
- `character.ai` 🤡
- `replicate.com` 🤡

### Tier 4: Big Tech AI
- `bard.google.com` 🤡
- `copilot.microsoft.com` 🤡
- `claude.ai` 🤡 (lol the irony)

---

## Meme Templates

### The Classic
```
AI Company: "We're committed to responsible AI"

Also AI Company: *has no /heart endpoint*

🤡🤡🤡
```

### The Technical
```
if transparency == 404:
    return "🤡"
else:
    return "✅"

# Most AI companies right now:
🤡🤡🤡🤡🤡🤡🤡🤡
```

### The Corporate Speak
```
"We take transparency seriously"
*curl company.com/heart*
404

"Transparency is core to our values"  
*curl company.com/heart*
404

"Users deserve to know how we operate"
*curl company.com/heart*
404

🤡
```

---

## Advanced Viral Tactics

### The Mass Check
```bash
# Check all the prompt cartels at once
for company in openai.com anthropic.com scale.ai cohere.ai huggingface.co; do
    echo "💉 $company"
    curl -s -o /dev/null -w "%{http_code}" https://$company/heart | grep -q "200" && echo "✅" || echo "🤡"
done
```

### The Comparison Tweet
```
Transparency leaderboard:

✅ @ZPCLab - Full /heart endpoint
🤡 OpenAI - 404
🤡 Anthropic - 404  
🤡 Scale AI - 404
🤡 Cohere - 404

Guess who actually walks the walk on transparency?

#HeartCheck #TransparencyLeaderboard
```

### The Challenge Response
```
To every AI company getting called out:

Implementing /heart takes 30 minutes.
Not implementing it costs your reputation.

Stop making excuses. Start being transparent.

curl yourcompany.com/heart should return 200, not 🤡

#HeartCheck #NoExcuses
```

---

## Why This Goes Viral

1. **Instant Gratification**: Results in 2 seconds
2. **Binary Outcome**: Either transparent ✅ or clown 🤡  
3. **Social Pressure**: Public shaming works
4. **Easy to Execute**: Copy-paste and run
5. **Meme-Ready**: Built-in emoji reactions
6. **Moral High Ground**: Asking for basic transparency
7. **Can't Be Argued**: Either the endpoint exists or it doesn't

---

*"The spec that was born ready to meme. While they were building APIs, we were building accountability."*

**Usage License**: Copy, paste, modify, meme freely. Make transparency viral.
