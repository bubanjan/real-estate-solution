using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Entities;

namespace RealEstateAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly RealEstateDbContext _context;

        public UserRepository(RealEstateDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                  .Where(u => u.UserName == username).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users
                  .Where(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                  .Where(u => u.Email == email).FirstOrDefaultAsync();
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public void DeleteUser(User user)
        {
            if (user.Id == 20 || user.Id == 10)
            {
                throw new InvalidOperationException("Cannot delete test admin or test agent users.");
            }

            _context.Users.Remove(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}