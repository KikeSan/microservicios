export class UsersController {
  repo

  constructor(repo) {
    this.repo = repo
    this.getUsers = this.getUsers.bind(this)
    this.getUser = this.getUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.login = this.login.bind(this)
    this.generateApiKey = this.generateApiKey.bind(this)
    this.validateApiKey = this.validateApiKey.bind(this)
    this.validateToken = this.validateToken.bind(this)
  }

  async getUsers(req, res) {
    const users = await this.repo.getUsers()

    res.json(users)
  }
  async getUser(req, res) {
    const user = await this.repo.getUsers()

    res.json(user)
  }

  async createUser(req, res) {
    const user = await this.repo.createUser(
      req.body.name,
      req.body.email,
      req.body.password
    )
    res.json({
      status: 201,
      message: 'User created',
    })
  }

  async updateUser(req, res) {
    await this.repo.updateUser(req.body.name)
    res.json({
      status: 201,
      message: 'User updated',
    })
  }

  async deleteUser(req, res) {
    await this.repo.deleteUser(req.params.id)
    res.json({
      status: 201,
      message: 'User deleted',
    })
  }

  async login(req, res) {
    const resp = await this.repo.login(req.body.username, req.body.password)

    if (resp) {
      res.status(200).json({
        status: 200,
        token: resp.token,
      })
    } else {
      res.status(401).json({
        status: 401,
        message: 'error',
      })
    }
  }
}
