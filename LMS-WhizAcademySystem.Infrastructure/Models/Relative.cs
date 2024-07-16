using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    public class Relative
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = null!;

        /// <summary>
        /// Relative child
        /// </summary>
        public int StudentId { get; set; }
        
        [JsonIgnore]
        public Student? Student { get; set; }
    }
}