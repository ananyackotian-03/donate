const http = require('http');

// Helper function to make HTTP requests
function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 TESTING ORGANIZATION MODULE\n');
  console.log('=====================================\n');

  let adminToken, userToken, userId, adminId, orgId;

  try {
    // TEST 1: Register org_admin user
    console.log('📝 TEST 1: Register org_admin user');
    const registerRes = await makeRequest('POST', '/api/auth/register', {
      name: 'Admin User',
      email: `admin${Date.now()}@test.com`,
      password: 'password123'
    });
    console.log('Response:', registerRes.data);
    console.log('Status:', registerRes.status);
    console.log('');

    // TEST 2: Login as user
    console.log('🔐 TEST 2: Login to get token');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: `admin${Date.now() - 100}@test.com`,
      password: 'password123'
    });
    
    if (loginRes.data && loginRes.data.token) {
      userToken = loginRes.data.token;
      console.log('✅ Token received:', userToken.substring(0, 20) + '...');
    } else {
      console.log('⚠️ Login failed, trying with database user...');
      // Try with a test user that might exist
      const testLoginRes = await makeRequest('POST', '/api/auth/login', {
        email: 'test@test.com',
        password: 'password123'
      });
      if (testLoginRes.data && testLoginRes.data.token) {
        userToken = testLoginRes.data.token;
        console.log('✅ Token received:', userToken.substring(0, 20) + '...');
      }
    }
    console.log('');

    // TEST 3: Get all organizations (public)
    console.log('📋 TEST 3: GET /api/organizations (public - no auth needed)');
    const allOrgsRes = await makeRequest('GET', '/api/organizations');
    console.log('Status:', allOrgsRes.status);
    console.log('Response:', JSON.stringify(allOrgsRes.data, null, 2));
    console.log('');

    // TEST 4: Create Organization (needs auth + role)
    if (userToken) {
      console.log('🏢 TEST 4: POST /api/organizations (Create Org - needs auth + org_admin role)');
      const createOrgRes = await makeRequest('POST', '/api/organizations', {
        name: `Test NGO ${Date.now()}`,
        description: 'Testing organization module',
        category: 'ngo',
        registrationNo: 'REG123456',
        address: 'Bangalore, India',
        contactEmail: `org${Date.now()}@test.com`,
        contactPhone: '9999999999',
        website: 'www.testngo.com'
      }, userToken);
      console.log('Status:', createOrgRes.status);
      console.log('Response:', JSON.stringify(createOrgRes.data, null, 2));
      
      if (createOrgRes.data && createOrgRes.data.data && createOrgRes.data.data._id) {
        orgId = createOrgRes.data.data._id;
        console.log('✅ Organization created with ID:', orgId);
      }
      console.log('');

      // TEST 5: Get organization by ID
      if (orgId) {
        console.log('📖 TEST 5: GET /api/organizations/:id (Get org details)');
        const getOrgRes = await makeRequest('GET', `/api/organizations/${orgId}`);
        console.log('Status:', getOrgRes.status);
        console.log('Response:', JSON.stringify(getOrgRes.data, null, 2));
        console.log('');

        // TEST 6: Get my organization
        console.log('🏠 TEST 6: GET /api/organizations/my (Get my org - auth required)');
        const myOrgRes = await makeRequest('GET', '/api/organizations/my', null, userToken);
        console.log('Status:', myOrgRes.status);
        console.log('Response:', JSON.stringify(myOrgRes.data, null, 2));
        console.log('');

        // TEST 7: Get organization members
        console.log('👥 TEST 7: GET /api/organizations/:id/members');
        const membersRes = await makeRequest('GET', `/api/organizations/${orgId}/members`, null, userToken);
        console.log('Status:', membersRes.status);
        console.log('Response:', JSON.stringify(membersRes.data, null, 2));
        console.log('');
      }
    }

    console.log('=====================================');
    console.log('✅ ORGANIZATION MODULE TESTS COMPLETE\n');

  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

// Run tests
runTests().catch(console.error);
