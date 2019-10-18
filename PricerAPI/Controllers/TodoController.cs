using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PricerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {

        static List<Todo> todo = new List<Todo>()
        {
            new Todo(){Id=0, Tag="Maison", Memo="test"},
            new Todo(){Id=1, Tag="Maison", Memo="test2"}
        };

        // GET: api/Todo
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return todo;
        }

        // GET: api/Todo/5
        [HttpGet("{id}", Name = "Get")]
        public Todo Get(int id)
        {
            return todo.Find(x => x.Id.Equals(id));
        }

        // POST: api/Todo
        [HttpPost]
        public void Post([FromBody] Todo t)
        {
            t.Id = todo.Count() + 1;
            todo.Add(t);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Todo t )
        {
            Todo result = todo.Find(x => x.Id.Equals(id));
            result.Memo = t.Memo;
            result.Tag = t.Tag;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Todo t = todo.Find(x => x.Id.Equals(id));
            todo.Remove(t);
        }
    }
}
