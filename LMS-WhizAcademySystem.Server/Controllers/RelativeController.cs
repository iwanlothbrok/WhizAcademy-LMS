namespace LMS_WhizAcademySystem.Server.Controllers
{
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/relatives")]
    [ApiController]
    public class RelativeController(IRelativeService relativeService) : ControllerBase
    {
        private readonly IRelativeService _relativeService = relativeService;

        [HttpPost("add")] // api/mentors/add FROM QUERY
        public IActionResult Post([FromBody] RelativeFormDto relative) //[
        {
            if (relative == null)
            {
                return BadRequest("Relative is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid ModelState.");
            }

            try
            {
                _relativeService.Add(relative);
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok("Mentor added successfully");
        }
    }
}
