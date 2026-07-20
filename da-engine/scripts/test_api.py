import asyncio
import httpx

async def test():
    headers = {"X-API-KEY": "5yaPCbGsWz5OQIAf2hJXveOHiflumsAAVWn3xeceC2ul1cVWj1rBY88atnHKQ7iF"}
    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.get("https://api.nscbiairport.com/api/files", headers=headers, params={"device_id": "Intern-pico-01", "limit": 5})
        print(f"List: {resp.status_code}")
        data = resp.json()
        total = data.get("pagination", {}).get("total", 0)
        print(f"Total files: {total}")

        if data.get("data"):
            fname = data["data"][0]["filename"]
            resp2 = await client.get(f"https://api.nscbiairport.com/api/files/{fname}", headers=headers)
            print(f"Download: {resp2.status_code}")

asyncio.run(test())
