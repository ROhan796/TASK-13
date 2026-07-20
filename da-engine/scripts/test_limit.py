import asyncio
import httpx

async def test():
    async with httpx.AsyncClient(timeout=15.0) as client:
        headers = {"X-API-KEY": "5yaPCbGsWz5OQIAf2hJXveOHiflumsAAVWn3xeceC2ul1cVWj1rBY88atnHKQ7iF"}
        
        for limit in [500, 100, 50, 20]:
            resp = await client.get("https://api.nscbiairport.com/api/files", headers=headers, params={"device_id": "Intern-pico-01", "limit": limit})
            print(f"limit={limit}: {resp.status_code}")
            if resp.status_code != 200:
                print(f"  Error: {resp.text[:200]}")
                break

asyncio.run(test())
