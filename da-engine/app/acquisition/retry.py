import httpx
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception
from loguru import logger

def is_retryable_exception(exception: BaseException) -> bool:
    if isinstance(exception, httpx.RequestError):
        return True
    if isinstance(exception, httpx.HTTPStatusError):
        status_code = exception.response.status_code
        # Retry on rate limiting (429) or server errors (5xx)
        if status_code == 429 or status_code >= 500:
            logger.warning(f"Retryable HTTP error encountered: {status_code}. Retrying...")
            return True
    return False

nscbi_retry_decorator = retry(
    retry=retry_if_exception(is_retryable_exception),
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1.5, min=2, max=10),
    reraise=True
)
